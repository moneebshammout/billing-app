require('../globals')()
const config = require('../config')
const { emailClient } = require('handlers/RootProvider')
const ResetPasswordEmail = require(__folders.notifications + '/ResetPasswordEmail')
const ChangeEmailEmail = require(__folders.notifications + '/ChangeEmailEmail')
const Queue = require('bull')
const { notificationType } = require(__folders.config)
var queue = new Queue('notifications', config.queue.redisUrl)

queue.process(1, function (job, done) {
  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.
  switch (job.data.type) {
    case notificationType.resetPasswordEmail:
      emailClient.send(new ResetPasswordEmail({ to: job.data.to, code: job.data.code, name: job.data.name, lang: job.data.lang }))
      break
    case notificationType.changeEmail:
      emailClient.send(new ChangeEmailEmail({ to: job.data.to, code: job.data.code }))
      break
    default:
    // code block
  }
  done()
})
