const router = require('express').Router()

const { BaseController } = require('controllers/BaseController')
const RootProvider = require('handlers/RootProvider')
const PaymentWebhookHandler = require('handlers/v1/external/paymentWebhookHandler')

class PaymentWebhookController extends BaseController {
  get router () {
    router.post('/payments/webhooks', this.handlerRunner(PaymentWebhookHandler))

    return router
  }

  async init () {
    this.logger.debug(`{External} ${this.constructor.name} initialized...`)
    await RootProvider.init()
  }
}

module.exports = { PaymentWebhookController }
