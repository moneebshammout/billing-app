const { BaseDAO } = require('backend-core')

class SubscriptionPlanDAO extends BaseDAO {
  static get tableName () {
    return 'subscriptionPlans'
  }

  static get relationMappings () {
    return {
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

module.exports = SubscriptionPlanDAO
