const { RequestRule } = require('core')
const CustomersDAO = require('database/dao/CustomerDAO')
const BaseHandler = require('handlers/BaseHandler')
const config = require('config')
const { paymentWebhookQueue, emailQueue } = require('handlers/RootProvider')
const PaymentWebhookModel = require('models/PaymentWebhookModel')
const PaymentClient = require('clients/PaymentClient')
const SubscriptionActionModel = require('models/SubscriptionActionModel')
class PaymentWebhookHandler extends BaseHandler {
  static get accessTag () {
    return '#external:paymentWebhook'
  }
  static get validationRules () {
    return {
      body: {
        success: new RequestRule(PaymentWebhookModel.schema.success, { required: true }),
        transaction: new RequestRule(PaymentWebhookModel.schema.transaction, { required: true }),
        meta: new RequestRule(PaymentWebhookModel.schema.meta, { required: true })
      }
    }
  }

  static async run (ctx) {
    const { success, transaction, meta } = ctx.body
    const customer = await CustomersDAO.baseGetById(meta.customerId)
    if (!success && meta.retryCount < 3) {
      const paymentClient = PaymentClient.create(meta.paymentMethod)
      await paymentClient.retryPayment(transaction)
    } else if (!success && meta.retryCount >= 3) {
      await CustomersDAO.baseUpdate(customer.id, { subscriptionStatus: SubscriptionActionModel.statusWorkflow.FAILED })
      emailQueue.enqueue({
        template: config.emailTemplates.SUBSCRIPTION_FAILED,
        to: customer.email
      })
    } else {
      paymentWebhookQueue.enqueue({
        transaction, meta
      })
    }

    return this.result({ data: { success }, message: 'Webhook Handled' })
  }
}

module.exports = PaymentWebhookHandler
