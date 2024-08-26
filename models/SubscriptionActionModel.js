const { BaseModel, Rule } = require('backend-core')
const joi = require('joi')
/**
 * @swagger
 *
 * definitions:
 *   SubscriptionAction:
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
  paymentData: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.object())
      } catch (e) { return e.message }
      return true
    },
    description: 'object;'
  }),

  paymentMethod: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.string().valid(...Object.values(SubscriptionActionModel.PaymentMethods)))
      } catch (e) { return e.message }
      return true
    },
    description: 'string;'
  }),
  autoRenew: new Rule({
    validator: v => {
      try {
        joi.assert(v, joi.boolean())
      } catch (e) { return e.message }
      return true
    },
    description: 'boolean;'
  })
}

class SubscriptionActionModel extends BaseModel {
  static get schema () {
    return schema
  }

  static get PaymentMethods () {
    return {
      VISA: 'visa',
      MASTERCARD: 'mastercard',
      AMEX: 'amex',
      CREDIT: 'credit',
      PAYPAL: 'paypal'
    }
  }

  static get statusWorkflow () {
    return {
      ACTIVE: 'active',
      PROCCESSING: 'proccessing',
      INACTIVE: 'inactive',
      CANCELED: 'canceled',
      OVERDUE: 'overdue',
      FAILED: 'failed'
    }
  }

  static get actions () {
    return {
      SUBSCRIBE: 'subscribe',
      CANCEL: 'cancel',
      RENEW: 'renew',
      UPGRADE: 'upgrade'
    }
  }
}

module.exports = SubscriptionActionModel
