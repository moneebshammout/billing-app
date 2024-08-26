const InvoiceDAO = require('database/dao/InvoiceDAO')
const BaseHandler = require('handlers/BaseHandler')
const { BaseModel, RequestRule } = require('core')
class ListCustomerInvoicesHandler extends BaseHandler {
  static get accessTag () {
    return 'customers:invoices:list'
  }
  static get validationRules () {
    return {
      params: {
        id: new RequestRule(BaseModel.genericSchema.id, { required: true })
      },
      query: {
        ...this.baseQueryParams
      }
    }
  }

  static async run (ctx) {
    ctx.query.filter = { customerId: ctx.params.id }
    const data = await InvoiceDAO.baseGetList(ctx.query)
    return this.result({ data, message: 'Customer Invoices list' })
  }
}

module.exports = ListCustomerInvoicesHandler
