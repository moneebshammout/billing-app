const { EmailClient, RedisClient, QueueClient } = require('../clients')
const config = require(__folders.config)
const logger = require('../util/logger')

class RootProvider {
  constructor () {
    this.redisClient = new RedisClient({
      host: config.redis.host,
      port: config.redis.port,
      logger
    })

    this.notificationClient = new QueueClient({
      name: 'notifications',
      url: config.queue.redisUrl,
      logger
    })

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
