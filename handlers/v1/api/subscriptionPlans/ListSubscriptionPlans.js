const SubscriptionPlanDAO = require('database/dao/SubscriptionPlanDAO')
const BaseHandler = require('handlers/BaseHandler')

class ListSubscriptionPlans extends BaseHandler {
  static get accessTag () {
    return 'subscription-plans:list'
  }
  static get validationRules () {
    return {
      ...this.baseQueryParams
    }
  }

  static async run (ctx) {
    const data = await SubscriptionPlanDAO.baseGetList(ctx.query)
    return this.result({ data, message: 'Subscription plans list' })
  }
}

module.exports = ListSubscriptionPlans
