const { BaseModel, Rule } = require('backend-core')
const joi = require('joi')
/**
 * @swagger
 *
 * definitions:
 *   SubscriptionPlan:
 *     allOf:
 *       - required:
 *         - id
 *       - properties:
 *          data:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *              isActive:
 *               type: boolean
 *              price:
 *               type: string
 *              discount:
 *               type: number
 *              billingInterval:
 *               type: string
 */
const schema = {
  ...BaseModel.genericSchema,

  name: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.string().min(3))
      } catch (e) { return e.message }
      return true
    },
    description: 'string;'
  }),

  isActive: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.bool())
      } catch (e) { return e.message }
      return true
    },
    description: 'boolean;'
  }),

  price: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.string().min(1))
        const float = parseFloat(v)
        if (isNaN(float)) throw new Error('Invalid price')
      } catch (e) { return e.message }
      return true
    },
    description: 'string;'
  }),

  discount: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.number().min(0).max(100))
      } catch (e) { return e.message }
      return true
    },
    description: 'number;'
  }),

  billingInterval: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.string().valid(...Object.values(SubscriptionPlanModel.workflow)))
      } catch (e) { return e.message }
      return true
    },
    description: 'string;'
  })
}

class SubscriptionPlanModel extends BaseModel {
  static get schema () {
    return schema
  }

  static get workflow () {
    return {
      MONTHLY: 'monthly',
      YEARLY: 'yearly'
    }
  }
}

module.exports = SubscriptionPlanModel
