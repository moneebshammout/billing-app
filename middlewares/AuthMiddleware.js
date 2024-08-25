const { errorCodes, ErrorWrapper, BaseMiddleware } = require('backend-core')
const logger = require('../util/logger')
const config = require('config')
class AuthMiddleware extends BaseMiddleware {
  async init () {
    logger.debug(`${this.constructor.name} initialized...`)
  }

  handler () {
    return (req, res, next) => {
      if (req.path.includes('external')) {
        const apiKey = req.headers['api-key'] || req.headers['Api-Key']
        if (!apiKey || apiKey !== config.app.apiKey) {
          return next(new ErrorWrapper({ ...errorCodes.ACCESS }))
        }
      } else if (req.path.includes('api')) {
        /**
         * Here we must contact our auth service to give us the current user
         * but for demo purposes we will use a demo object
         */
        const authorization = req.headers['authorization'] || req.headers['Authorization']
        const bearer = authorization && authorization.startsWith('Bearer ') ? authorization : null
        const token = bearer ? bearer.split('Bearer ')[1] : null
        req.currentUser = Object.freeze({
          id: null,
          customer: null
        })

        if (token) {
          return next()
        }

        return next(new ErrorWrapper({ ...errorCodes.ACCESS }))
      } else {
        return next(new ErrorWrapper({ ...errorCodes.ACCESS }))
      }

      next()
    }
  }
}

module.exports = { AuthMiddleware }
