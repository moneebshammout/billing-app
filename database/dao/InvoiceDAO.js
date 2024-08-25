const { BaseDAO } = require('backend-core')

class InvoiceDAO extends BaseDAO {
  static get tableName () {
    return 'invoices'
  }

  static get relationMappings () {
    return {
      Subscription: {
        relation: BaseDAO.BelongsToOneRelation,
        modelClass: `${__dirname}/CustomerDAO`,
        join: {
          from: 'invoices.customerId',
          to: 'customers.id'
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

module.exports = InvoiceDAO
