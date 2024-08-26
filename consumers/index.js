const notificationConsumer = require('./notifications-consumer')
const paymentWebhookConsumer = require('./payment-webhook-consumer')
const subsscriptionDateQueue = require('./subscription-date-queue')

module.exports = [
  notificationConsumer,
  paymentWebhookConsumer,
  subsscriptionDateQueue
]
