require('../globals')()
require('dotenv').config()
const config = require('config')
const { Model } = require('objection')
const Knex = require('knex')
Model.knex(Knex(config.knex))
const Queue = require('bull')
const CustomersDAO = require('database/dao/CustomerDAO')
const { emailQueue } = require('handlers/RootProvider')
var queue = new Queue(config.queue.subscriptionDateQueue, config.queue.redisUrl)
queue.process(async function (job, done) {
  console.log('New SubscriptionDateQueue Processing job %s', job.id)
  let page = 0
  const limit = 5000
  while (true) {
    const customers = await CustomersDAO.baseGetList({
      page,
      limit,
      filter: { subscriptionStatus: 'active' },
      orderBy: {
        field: 'subscriptionEndDate', direction: 'asc'
      } })

    if (!customers.results.length) {
      break
    }

    for (const customer of customers.results) {
      const overdueStats = checkOverdue(customer.subscriptionEndDate)

      if (overdueStats) {
        let emailTemplate = config.emailTemplates.SUBSCRIPTION_NEARLY_OVERDUE
        if (overdueStats === 'overdue') {
          await CustomersDAO.baseUpdate(customer.id, { subscriptionStatus: 'overdue' })
          emailTemplate = config.emailTemplates.SUBSCRIPTION_OVERDUE
        }
        emailQueue.enqueue({
          template: emailTemplate,
          to: customer.email
        })
      }
    }

    page += 1
  }

  done()
})

function checkOverdue (timestamp) {
  const timestampDate = new Date(timestamp)
  const now = new Date()
  const diffInMilliseconds = now - timestampDate
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24)

  if (diffInDays > 14) {
    return null
  } else if (diffInDays > 7) {
    return '2weeks'
  } else if (diffInDays >= 0) {
    return '1week'
  } else {
    return 'overdue'
  }
}

// cronjob every day at 12 midnight
queue.add({}, { repeat: { cron: '0 0 * * *' } })
