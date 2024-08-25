const { InitMiddleware } = require('./InitMiddleware')
const { CorsMiddleware } = require('./CorsMiddleware')
const { AuthMiddleware } = require('./AuthMiddleware')
const { SanitizeMiddleware } = require('./SanitizeMiddleware')
const { QueryMiddleware } = require('./QueryMiddleware')
const { CacheMiddleware } = require('./CacheMiddleware')
const { ContentTypeMiddleware } = require('./ContentTypeMiddleware')
const { BasicAuthMiddleware } = require('./BasicAuthMiddleware')

module.exports = [
  InitMiddleware,
  CorsMiddleware,
  ContentTypeMiddleware,
  AuthMiddleware,
  SanitizeMiddleware,
  QueryMiddleware,
  CacheMiddleware,
  BasicAuthMiddleware
]
