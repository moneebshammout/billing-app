const { BaseDAO } = require('backend-core')

class CustomersDAO extends BaseDAO {
  static get tableName () {
    return 'customers'
  }

  static get relationMappings () {
    return {
      Subscription: {
        relation: BaseDAO.BelongsToOneRelation,
        modelClass: `${__dirname}/SubscriptionPlanDAO`,
        join: {
          from: 'customers.subscriptionPlanId',
          to: 'subscriptionPlans.id'
        }
      },
      invoices: {
        relation: BaseDAO.HasManyRelation,
        modelClass: `${__dirname}/InvoiceDAO`,
        join: {
          from: 'customers.id',
          to: 'invoices.customerId'
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

module.exports = CustomersDAO
