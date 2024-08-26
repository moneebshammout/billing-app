const { RequestRule, ErrorWrapper, errorCodes } = require('core')
const CustomersDAO = require('database/dao/CustomerDAO')
const BaseHandler = require('handlers/BaseHandler')
const SubscriptionActionModel = require('models/SubscriptionActionModel')
const config = require('config')
const { emailQueue } = require('handlers/RootProvider')
class CancelHandler extends BaseHandler {
  static get accessTag () {
    return 'subscription-action:cancel'
  }
  static get validationRules () {
    return {
      body: {
        customerId: new RequestRule(SubscriptionActionModel.schema.id, { required: true })
      }
    }
  }

  static async run (ctx) {
    const { customerId } = ctx.body
    const customer = await CustomersDAO.baseGetById(customerId)
    if (customer.subscriptionStatus !== SubscriptionActionModel.statusWorkflow.ACTIVE) {
      throw new ErrorWrapper({
        ...errorCodes.BAD_REQUEST,
        layer: 'CancelHandler',
        message: 'User Doesnt have an on going subscription'
      })
    }

    if (!customer.autoRenewSubscription) {
      throw new ErrorWrapper({
        ...errorCodes.BAD_REQUEST,
        layer: 'CancelHandler',
        message: 'User doesnt have an auto renew subscription'
      })
    }

    /**
       * cancelation will be done by the subscription end date cronjob here will just remove the auto renew
       */
    const data = await CustomersDAO.baseUpdate(customerId, {
      autoRenewSubscription: false
    })

    emailQueue.enqueue({
      template: config.emailTemplates.SUBSCRIPTION_CANCELED,
      to: customer.email,
      context: {
        subscriptionPlan: customer.subscriptionPlan
      }
    })

    return this.result({ data, message: 'Subscription Cancelled successfully' })
  }
}

module.exports = CancelHandler
