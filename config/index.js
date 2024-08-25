const app = require('./app')
const knex = require('./knex')
const folders = require('./folders')
const email = require('./email')
const redis = require('./redis')
const queue = require('./queue')
const rateLimting = require('./rateLimiting')
const swagger = require('./swagger')
const notificationType = require('./notificationType')
const cacheRoutes = require('./cacheRoutes')
const basicAuth = require('./basicAuth')
const basicAuthRoutes = require('./basicAuthRoutes')

const asyncConfigs = [
  app,
  knex,
  email
]

function mainInit () {
  return new Promise(async (resolve, reject) => {
    for (const config of asyncConfigs) {
      try {
        await config.init()
      } catch (e) {
        return reject(e)
      }
    }
    resolve()
  })
}

module.exports = {
  app,
  knex,
  folders,
  email,
  redis,
  queue,
  rateLimting,
  swagger,
  notificationType,
  mainInit,
  cacheRoutes,
  basicAuth,
  basicAuthRoutes
}
