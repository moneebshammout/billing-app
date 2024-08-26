const { BaseModel, Rule } = require('backend-core')
const joi = require('joi')
/**
 * @swagger
 *
 * definitions:
 *   PaymentWebhookModel:
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
  success: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.boolean())
      } catch (e) { return e.message }
      return true
    },
    description: 'object;'
  }),

  meta: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.object().keys({
          subscriptionPlanId: joi.number().required(),
          customerId: joi.number().required(),
          action: joi.string().required(),
          retryCount: joi.number().required(),
          paymentMethod: joi.string().required()
        }))
      } catch (e) { return e.message }
      return true
    },
    description: 'object;'
  }),

  transaction: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.object().keys({
          id: joi.number().required(),
          amount: joi.number().required(),
          currency: joi.string().required()
        }))
      } catch (e) { return e.message }
      return true
    },
    description: 'object;'
  })
}

class PaymentWebhookModel extends BaseModel {
  static get schema () {
    return schema
  }
}

module.exports = PaymentWebhookModel
