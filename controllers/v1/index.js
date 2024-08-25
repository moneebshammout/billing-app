const routesV1 = require('./api')
const routesExternalV1 = require('./external')

module.exports = [
  {
    routes: routesV1,
    version: '/api/v1'
  }, {
    routes: routesExternalV1,
    version: '/api/v1/external'
  }
]
