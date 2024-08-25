const { BaseDAO } = require('backend-core')

class PaymentDAO extends BaseDAO {
  static get tableName () {
    return 'payments'
  }

  static get relationMappings () {
    return {
      Subscription: {
        relation: BaseDAO.BelongsToOneRelation,
        modelClass: `${__dirname}/InvoiceDAO`,
        join: {
          from: 'payments.invoiceId',
          to: 'invoices.id'
        }
      }
    }
  }

  /**
   * ------------------------------
   * @HOOKS
   * ------------------------------
   */
  $formatJson (json) {
    json = super.$formatJson(json)

    delete json.createdAt
    delete json.updatedAt

    return json
  }

  /**
   * ------------------------------
   * @METHODS
   * ------------------------------
   */
}

module.exports = PaymentDAO
