const Paypal = require('./paypal')
const Stripe = require('./stripe')
const SubscriptionActionModel = require('models/SubscriptionActionModel')

/**
 * @IMPORTANT This class is a simulation of a payment gateway integration
 *
 * @IMPORTANT each method will send a meta data to be returned by gateway webhhok which will be used to handle the action
 */
class PaymentStrategy {
  constructor (strategy) {
    this.strategy = strategy
  }

  async proccessSubscription (...options) {
    return this.strategy.proccessSubscription(...options)
  }

  async processUpgrade (...options) {
    return this.strategy.processUpgrade(...options)
  }

  async processDowngrade (...options) {
    return this.strategy.processDowngrade(...options)
  }

  async retryPayment (...options) {
    return this.strategy.retryPayment(...options)
  }
}

class PaymentStrategyFactory {
  static create (strategyType) {
    switch (strategyType) {
      case SubscriptionActionModel.PaymentMethods.CREDIT:
      case SubscriptionActionModel.PaymentMethods.MASTERCARD:
      case SubscriptionActionModel.PaymentMethods.VISA:
      case SubscriptionActionModel.PaymentMethods.AMEX:
        return new PaymentStrategy(new Stripe())
      case SubscriptionActionModel.PaymentMethods.PAYPAL:
        return new PaymentStrategy(new Paypal())
      default:
        throw new Error('Invalid Payment strategy type.')
    }
  }
}

module.exports = PaymentStrategyFactory
