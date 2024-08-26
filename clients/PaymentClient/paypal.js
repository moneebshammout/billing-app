class PaypalClient {
  async proccessSubscription (paymentData, subscriptionPlan) {
    return true
  }
  async processUpgrade (paymentData, subscriptionPlan) {
    return true
  }
  async processDowngrade (paymentData, subscriptionPlan) {
    return true
  }
  async retryPayment (paymentData, subscriptionPlan) {
    return true
  }
}

module.exports = PaypalClient
