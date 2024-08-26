require('../globals')()
require('dotenv').config()
const config = require('config')
const { Model } = require('objection')
const Knex = require('knex')
Model.knex(Knex(config.knex))
const SubscriptionActionModel = require('models/SubscriptionActionModel')
const Queue = require('bull')
const SubscriptionPlanDAO = require('database/dao/SubscriptionPlanDAO')
const CustomersDAO = require('database/dao/CustomerDAO')
const SubscriptionPlanModel = require('models/SubscriptionPlanModel')
const InvoiceDAO = require('database/dao/InvoiceDAO')
const { emailQueue } = require('handlers/RootProvider')
const PaymentDAO = require('database/dao/PaymentDAO')
var queue = new Queue(config.queue.paymentWebhookQueue, config.queue.redisUrl)

queue.process(10, async function (job, done) {
  console.log('New paymentWebhookQueue Processing job %s', job.id)
  const { transaction, meta } = job.data
  const subscriptionPlan = await SubscriptionPlanDAO.baseGetById(meta.subscriptionPlanId)
  const customer = await CustomersDAO.baseGetById(meta.customerId)

  let subscriptionEndDate
  let emailPayload
  switch (meta.action) {
    case SubscriptionActionModel.actions.SUBSCRIBE:
      emailPayload = {
        template: config.emailTemplates.SUBSCRIPTION_STARTED,
        to: customer.email
      }
      subscriptionEndDate = getSubscriptionEndDate(subscriptionPlan)
      break
    case SubscriptionActionModel.actions.UPGRADE:
      emailPayload = {
        template: config.emailTemplates.SUBSCRIPTION_UPGRADED,
        to: customer.email
      }
      subscriptionEndDate = getSubscriptionEndDate(subscriptionPlan, customer.subscriptionEndDate)
      break
    case SubscriptionActionModel.actions.DOWNGRADE:
      emailPayload = {
        template: config.emailTemplates.SUBSCRIPTION_DOWNGRADED,
        to: customer.email
      }
      subscriptionEndDate = getSubscriptionEndDate(subscriptionPlan, customer.subscriptionEndDate)
      break
    default:
      break
  }

  await CustomersDAO.baseUpdate(customer.id, {
    subscriptionPlanId: subscriptionPlan.id,
    subscriptionStatus: SubscriptionActionModel.statusWorkflow.ACTIVE,
    subscriptionEndDate
  })

  const invoice = await InvoiceDAO.baseCreate({
    customerId: customer.id,
    data: {
      subscriptionPlan: subscriptionPlan.name,
      price: transaction.amount,
      discount: `${subscriptionPlan.discount}%`,
      subscriptionEndDate
    }
  })

  await PaymentDAO.baseCreate({
    invoiceId: invoice.id,
    paymentMethod: meta.paymentMethod
  })

  if (emailPayload) {
    emailPayload.invoice = invoice
    emailQueue.enqueue(emailPayload)
  }
  done()
})

const getSubscriptionEndDate = (subscriptionPlan, oldEndDate = null) => {
  let date = oldEndDate ? new Date(oldEndDate) : new Date()

  if (subscriptionPlan.billingInterval === SubscriptionPlanModel.billingWorkflow.MONTHLY) {
    date.setMonth(date.getMonth() + 1)
  } else if (subscriptionPlan.billingInterval === SubscriptionPlanModel.billingWorkflow.YEARLY) {
    date.setFullYear(date.getFullYear() + 1)
  }

  return date
}

