const { BaseConfig } = require('backend-core')
const logger = require('../util/logger')
class QueueConfig extends BaseConfig {
  constructor () {
    super()

    this.redisUrl = this.set('QUEUE_REDIS_HOST', this.joi.string().required())
    this.emailQueue = this.set('EMAIL_QUEUE', this.joi.string().required())
    this.paymentWebhookQueue = this.set('PAYMENT_WEBHOOK_QUEUE', this.joi.string().required())
  }
  async init () {
    logger.debug(`${this.constructor.name}: Initialization finish...`)
  }
}

module.exports = new QueueConfig()
