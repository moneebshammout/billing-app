const { BaseModel, RequestRule } = require('core')
const CustomersDAO = require('database/dao/CustomerDAO')
const InvoiceDAO = require('database/dao/InvoiceDAO')
const BaseHandler = require('handlers/BaseHandler')

class GetCustomerSubscriptionDetailsHandler extends BaseHandler {
  static get accessTag () {
    return 'customers:subscription-details:get'
  }

  static get validationRules () {
    return {
      params: {
        id: new RequestRule(BaseModel.genericSchema.id, { required: true })
      }
    }
  }

  static async run (ctx) {
    const data = await CustomersDAO.baseGetById(ctx.params.id, 'subscription')
    data.invoice = await InvoiceDAO.baseFindOneWhere({ customerId: ctx.params.id }, true)
    return this.result({ data, message: 'Customer subscription details' })
  }
}

module.exports = GetCustomerSubscriptionDetailsHandler
