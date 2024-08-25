const { RequestRule } = require('core')
const SubscriptionPlanDAO = require('database/dao/SubscriptionPlanDAO')
const BaseHandler = require('handlers/BaseHandler')
const SubscriptionPlanModel = require('models/SubscriptionPlanModel')

class CreateSubscriptionPlans extends BaseHandler {
  static get accessTag () {
    return 'subscription-plans:create'
  }
  static get validationRules () {
    return {
      body: {
        name: new RequestRule(SubscriptionPlanModel.schema.name, { required: true }),
        isActive: new RequestRule(SubscriptionPlanModel.schema.isActive, { required: true }),
        price: new RequestRule(SubscriptionPlanModel.schema.price, { required: true }),
        discount: new RequestRule(SubscriptionPlanModel.schema.discount, { required: true }),
        billingInterval: new RequestRule(SubscriptionPlanModel.schema.billingInterval, { required: true })
      }
    }
  }

  static async run (ctx) {
    const data = await SubscriptionPlanDAO.baseCreate(ctx.body)
    return this.result({ data, message: 'Subscription plan created' })
  }
}

module.exports = CreateSubscriptionPlans
