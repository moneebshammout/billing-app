const { RequestRule } = require('core')
const SubscriptionPlanDAO = require('database/dao/SubscriptionPlanDAO')
const BaseHandler = require('handlers/BaseHandler')
const SubscriptionPlanModel = require('models/SubscriptionPlanModel')

class UpdateSubscriptionPlans extends BaseHandler {
  static get accessTag () {
    return 'subscription-plans:update'
  }
  static get validationRules () {
    return {
      params: {
        id: new RequestRule(SubscriptionPlanModel.schema.id, { required: true })
      },
      body: {
        name: new RequestRule(SubscriptionPlanModel.schema.name),
        isActive: new RequestRule(SubscriptionPlanModel.schema.isActive),
        price: new RequestRule(SubscriptionPlanModel.schema.price),
        discount: new RequestRule(SubscriptionPlanModel.schema.discount),
        billingInterval: new RequestRule(SubscriptionPlanModel.schema.billingInterval)
      }
    }
  }

  static async run (ctx) {
    const data = await SubscriptionPlanDAO.baseUpdate(ctx.params.id, ctx.body)
    return this.result({ data, message: 'Subscription plan Updated' })
  }
}

module.exports = UpdateSubscriptionPlans
