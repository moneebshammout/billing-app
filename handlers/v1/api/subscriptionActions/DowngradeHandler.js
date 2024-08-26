const { RequestRule, ErrorWrapper, errorCodes } = require('core')
const CustomersDAO = require('database/dao/CustomerDAO')
const SubscriptionPlanDAO = require('database/dao/SubscriptionPlanDAO')
const BaseHandler = require('handlers/BaseHandler')
const SubscriptionActionModel = require('models/SubscriptionActionModel')
const PaymentClient = require('clients/PaymentClient')

class DowngradeHandler extends BaseHandler {
  static get accessTag () {
    return 'subscription-action:downgrade'
  }
  static get validationRules () {
    return {
      params: {
        id: new RequestRule(SubscriptionActionModel.schema.id, { required: true })
      },
      body: {
        paymentData: new RequestRule(SubscriptionActionModel.schema.paymentData, { required: true }),
        customerId: new RequestRule(SubscriptionActionModel.schema.id, { required: true }),
        autoRenew: new RequestRule(SubscriptionActionModel.schema.autoRenew, { required: true }),
        paymentMethod: new RequestRule(SubscriptionActionModel.schema.paymentMethod, { required: true })
      }
    }
  }

  static async run (ctx) {
    const { customerId, paymentMethod, paymentData, autoRenew } = ctx.body
    const customer = await CustomersDAO.baseGetById(customerId, 'subscription')
    if (customer.subscriptionStatus !== SubscriptionActionModel.statusWorkflow.ACTIVE) {
      throw new ErrorWrapper({
        ...errorCodes.BAD_REQUEST,
        layer: 'DowngradeHandler',
        message: 'User Doesnt have an on going subscription'
      })
    }

    if (customer.subscriptionStatus === SubscriptionActionModel.statusWorkflow.PROCCESSING) {
      throw new ErrorWrapper({
        ...errorCodes.BAD_REQUEST,
        layer: 'SubscribeHandler',
        message: 'User Subscription being proccessed'
      })
    }

    if (ctx.params.id === customer.subscription.id) {
      throw new ErrorWrapper({
        ...errorCodes.BAD_REQUEST,
        layer: 'DowngradeHandler',
        message: 'User cannot downgrade to the same plan'
      })
    }

    const subscriptionPlan = await SubscriptionPlanDAO.baseGetById(ctx.params.id)
    if (parseFloat(subscriptionPlan.price) > parseFloat(customer.subscription.price)) {
      throw new ErrorWrapper({
        ...errorCodes.BAD_REQUEST,
        layer: 'DowngradeHandler',
        message: 'User cannot downgrade to a plan that is higher than his current plan'
      })
    }

    const paymentClient = PaymentClient.create(paymentMethod)
    const isPaymentOk = await paymentClient.processDowngrade(paymentData, subscriptionPlan)
    if (!isPaymentOk) {
      throw new ErrorWrapper({ ...errorCodes.SERVER, layer: 'DowngradeHandler', message: 'Payment failed' })
    }

    /**
     * after the payment gateway replies with a webhook
     * if its sucessfull we will update the status to active and calculate the end date and generate invoice
     */
    const data = await CustomersDAO.baseUpdate(customerId, {
      autoRenewSubscription: autoRenew
    })

    return this.result({ data, message: 'Upgrading Subscription being proccessed' })
  }
}

module.exports = DowngradeHandler
