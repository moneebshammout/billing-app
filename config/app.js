const { BaseConfig } = require('backend-core')
const logger = require('../util/logger')
class AppConfig extends BaseConfig {
  constructor () {
    super()
    this.nodeEnv = this.set('NODE_ENV', v => ['development', 'production'].includes(v), 'development')
    this.port = this.set('APP_PORT', this.joi.number().port().required(), 5555)
    this.host = this.set('APP_HOST', this.joi.string().required(), 'localhost')
    this.name = this.set('APP_NAME', this.joi.string().required(), 'BackendAPI')
    this.url = this.set('APP_URL', this.joi.string().required())
    this.sentryDsn = this.set('SENTRY_DSN', this.joi.string().required())
    this.sentryCapture = (this.set('SENTRY_CAPTURE', this.joi.boolean().required()) === 'true')
    this.desc = this.set('APP_DESC', this.joi.string().required())
    this.version = this.set('APP_VERSION', this.joi.string().required())
    this.apiKey = this.set('API_KEY', this.joi.string().required())
  }

  async init () {
    logger.debug(`${this.constructor.name}: Initialization finish...`)
  }
}

module.exports = new AppConfig()
