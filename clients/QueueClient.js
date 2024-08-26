/**
 * https://optimalbits.github.io/bull/
 */

const $ = Symbol('private scope')
const queue = require('bull')
const { assert } = require('backend-core')
const config = require('config')
const logger = require('util/logger')
class QueueClient {
  constructor (name) {
    assert.string(name, { notEmpty: true })

    this[$] = {
      client: queue(
        name,
        config.queue.redisUrl
      ),
      logger: logger
    }

    this[$].logger.debug(`${this.constructor.name} constructed...`)
  }

  enqueue (data, options = {}) {
    options = {
      defaultJobOptions: {
        removeOnComplete: {
          age: 60 * 60 * 24 * 30
        }
      },
      ...options
    }
    assert.object(data, { required: true })
    return new Promise((resolve, reject) => {
      this[$].client.add(data, options, function (error, response, body) {
        if (error) throw new Error(error)
        return resolve(response)
      })
    })
  }
}

module.exports = QueueClient
