const config = require('./config')

module.exports = {
  development: {
    ...config.knex
  },
  staging: {
    ...config.knex
  },
  production: {
    ...config.knex
  }
}
