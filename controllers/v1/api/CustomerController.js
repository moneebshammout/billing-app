const router = require('express').Router()

const { BaseController } = require('controllers/BaseController')
const RootProvider = require('handlers/RootProvider')
const handlers = require('handlers/v1/api/customers')
class CustomerController extends BaseController {
  get router () {
    /**
     * @swagger
     * /customers/{id}/subscriptions:
     *   get:
     *     summary: Get Customer Subscription Details
     *     description: Retrieve subscription details for a specific customer by ID.
     *     tags:
     *       - Customers
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the customer
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Customer subscription details retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   description: The customer's subscription details.
     *                 message:
     *                   type: string
     *                   example: Customer subscription details
     *       400:
     *         description: Invalid customer ID.
     *       404:
     *         description: Customer not found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/customers/:id/subscriptions', this.handlerRunner(handlers.GetCustomerSubscriptionDetailsHandler))

    /**
     * @swagger
     * /customers/{id}/invoices:
     *   get:
     *     summary: List Customer Invoices
     *     description: Retrieve a list of invoices for a specific customer by ID.
     *     tags:
     *       - Customers
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the customer
     *         schema:
     *           type: string
     *       - in: query
     *         name: limit
     *         required: false
     *         description: The number of invoices to return.
     *         schema:
     *           type: integer
     *           example: 10
     *       - in: query
     *         name: offset
     *         required: false
     *         description: The number of invoices to skip before starting to collect the result set.
     *         schema:
     *           type: integer
     *           example: 0
     *       - in: query
     *         name: sort
     *         required: false
     *         description: Sort order of the invoices.
     *         schema:
     *           type: string
     *           example: '-createdAt'
     *       - in: query
     *         name: filter
     *         required: false
     *         description: Filter conditions for querying invoices.
     *         schema:
     *           type: object
     *     responses:
     *       200:
     *         description: List of customer invoices retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     description: Details of an invoice.
     *                 message:
     *                   type: string
     *                   example: Customer Invoices list
     *       400:
     *         description: Invalid customer ID or query parameters.
     *       404:
     *         description: Customer or invoices not found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/customers/:id/invoices', this.handlerRunner(handlers.ListCustomerInvoicesHandler))

    return router
  }

  async init () {
    this.logger.debug(`{APP} ${this.constructor.name} initialized...`)
    await RootProvider.init()
  }
}

module.exports = { CustomerController }
