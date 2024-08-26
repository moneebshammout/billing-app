const { EmailClient, RedisClient, QueueClient } = require('clients')
const config = require('config')
const logger = require('util/logger')

class RootProvider {
  constructor () {
    this.redisClient = new RedisClient({
      host: config.redis.host,
      port: config.redis.port,
      logger
    })

    this.emailQueue = new QueueClient(config.queue.emailQueue)
    this.paymentWebhookQueue = new QueueClient(config.queue.paymentWebhookQueue)

    // Loading SMTP Client
    this.emailClient = new EmailClient({
      username: config.email.username,
      password: config.email.password,
      host: config.email.host,
      port: config.email.port,
      from: config.email.from,
      logger
    })
  }
  async init () {
    logger.debug(`${this.constructor.name} initialized...`)
  }
}

module.exports = new RootProvider()
