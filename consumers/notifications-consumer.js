require('../globals')()
require('dotenv').config()

const config = require('../config')
const { emailClient } = require('handlers/RootProvider')
const Queue = require('bull')
var queue = new Queue('notifications', config.queue.redisUrl)

queue.process(10, function (job, done) {
  const template = require(`notifications/templates/${job.data.template}.email`)
  emailClient.send({
    template,
    context: job.data.context,
    to: job.data.to
  })
  done()
})
