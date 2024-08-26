const router = require('express').Router()

const plansHandlers = require('handlers/v1/api/subscriptionPlans')
const actionsHandlers = require('handlers/v1/api/subscriptionActions')
const { BaseController } = require('controllers/BaseController')

class SubscriptionController extends BaseController {
  get router () {
    /**
     * @swagger
     * /subscriptions/plans:
     *   get:
     *     tags:
     *      - Subscriptions
     *     name: ListSubscriptionPlans
     *     summary: Get list of subscription plans
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     security:
     *        - JWT: []
     *     responses:
     *       '200':
     *         description: Returns list of subscription plans
     *         schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: object
     *                   properties:
     *                     name:
     *                      type: string
     *                     isActive:
     *                      type: boolean
     *                     price:
     *                      type: string
     *                     discount:
     *                      type: integer
     *                     billingInterval:
     *                      type: string
     *                     createdAt:
     *                      type: string
     *                     updatedAt:
     *                      type: string
     *       '400':
     *         description: Bad request
     */
    router.get('/subscriptions/plans', this.handlerRunner(plansHandlers.ListSubscriptionPlans))

    /**
     * @swagger
     * /subscriptions/plans:
     *   post:
     *     tags:
     *      - Subscriptions
     *     summary: Create new subscription plan.
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *             isActive:
     *               type: boolean
     *             price:
     *               type: string
     *             discount:
     *               type: integer
     *             billingInterval:
     *               type: string
     *     security:
     *        - JWT: []
     *     responses:
     *       '200':
     *         description: Returns Created subscription plan
     *         content:
     *         schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *       '400':
     *         description: Bad request
     */
    router.post('/subscriptions/plans', this.handlerRunner(plansHandlers.CreateSubscriptionPlans))

    /**
     * @swagger
     * /subscriptions/plans:
     *   patch:
     *     security:
     *      - JWT: []
     *     tags:
     *      - Subscriptions
     *     summary: Update subscription plan.
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: id
     *           in: path
     *           type: integer
     *       - name: body
     *         in: body
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *             isActive:
     *               type: boolean
     *             price:
     *               type: string
     *             discount:
     *               type: integer
     *             billingInterval:
     *               type: string
     *     responses:
     *       '200':
     *         description: user updated successfully.
     *       '400':
     *         description: Bad request
     *       '404':
     *          description: user not found
     *
     */
    router.patch('/subscriptions/plans/:id', this.handlerRunner(plansHandlers.UpdateSubscriptionPlans))

    /**
     * @swagger
     * /subscriptions/plans/{id}/subscribe:
     *   post:
     *     tags:
     *       - Subscriptions
     *     summary: Subscribe a customer to a subscription plan
     *     description: Initiates a subscription for a customer to a specific plan, processing the payment and setting the subscription status.
     *     operationId: subscribe
     *     parameters:
     *       - name: subscriptionPlanId
     *         in: path
     *         required: true
     *         description: The ID of the subscription plan the customer is subscribing to
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               paymentData:
     *                 type: object
     *                 description: Payment details for processing the subscription
     *               customerId:
     *                 type: string
     *                 description: The ID of the customer subscribing to the plan
     *               autoRenew:
     *                 type: boolean
     *                 description: Indicates whether the subscription should auto-renew
     *             required:
     *               - paymentData
     *               - customerId
     *               - autoRenew
     *     responses:
     *       200:
     *         description: Subscription is being processed
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   description: Updated customer data after initiating the subscription
     *                 message:
     *                   type: string
     *                   example: Subscription being processed
     *       400:
     *         description: Bad request, e.g., customer already has an active subscription
     *       500:
     *         description: Internal server error, e.g., payment processing failed
     */
    router.post('/subscriptions/plans/:id/subscribe', this.handlerRunner(actionsHandlers.SubscribeHandler))

    /**
     * @swagger
     * /subscriptions/plans/{id}/upgrade:
     *   post:
     *     tags:
     *       - Subscriptions
     *     summary: Upgrade a customer's subscription plan
     *     description: Upgrades an existing active subscription to a new plan, processing the payment and updating the subscription details.
     *     operationId: upgradeSubscription
     *     parameters:
     *       - name: subscriptionPlanId
     *         in: path
     *         required: true
     *         description: The ID of the new subscription plan the customer is upgrading to
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               paymentData:
     *                 type: object
     *                 description: Payment details for processing the subscription upgrade
     *               customerId:
     *                 type: string
     *                 description: The ID of the customer upgrading their subscription
     *               autoRenew:
     *                 type: boolean
     *                 description: Indicates whether the upgraded subscription should auto-renew
     *             required:
     *               - paymentData
     *               - customerId
     *               - autoRenew
     *     responses:
     *       200:
     *         description: Subscription upgrade is being processed
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   description: Updated customer data after initiating the subscription upgrade
     *                 message:
     *                   type: string
     *                   example: Upgrading Subscription being processed
     *       400:
     *         description: Bad request, e.g., customer doesn't have an ongoing subscription
     *       500:
     *         description: Internal server error, e.g., payment processing failed
     */
    router.post('/subscriptions/plans/:id/upgrade', this.handlerRunner(actionsHandlers.UpgradeHandler))

    /**
     * @swagger
     * /subscriptions/plans/{id}/downgrade:
     *   post:
     *     tags:
     *       - Subscriptions
     *     summary: Downgrade a customer's subscription plan
     *     description: Downgrades an existing active subscription to a lower plan, processing the refund and updating the subscription details.
     *     operationId: downgradeSubscription
     *     parameters:
     *       - name: subscriptionPlanId
     *         in: path
     *         required: true
     *         description: The ID of the new subscription plan the customer is downgrading to
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               paymentData:
     *                 type: object
     *                 description: Payment details for processing the subscription downgrade (including any necessary refunds)
     *               customerId:
     *                 type: string
     *                 description: The ID of the customer downgrading their subscription
     *               autoRenew:
     *                 type: boolean
     *                 description: Indicates whether the downgraded subscription should auto-renew
     *             required:
     *               - paymentData
     *               - customerId
     *               - autoRenew
     *     responses:
     *       200:
     *         description: Subscription downgrade is being processed
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   description: Updated customer data after initiating the subscription downgrade
     *                 message:
     *                   type: string
     *                   example: Downgrading Subscription being processed
     *       400:
     *         description: Bad request, e.g., customer doesn't have an ongoing subscription
     *       500:
     *         description: Internal server error, e.g., payment processing failed
     */
    router.post('/subscriptions/plans/:id/downgrade', this.handlerRunner(actionsHandlers.DowngradeHandler))

    /**
     * @swagger
     * /cancel:
     *   post:
     *     tags:
     *       - Subscriptions
     *     summary: Cancel a customer's subscription
     *     description: Cancels the auto-renewal of an active subscription, allowing it to expire at the end of the current billing cycle.
     *     operationId: cancelSubscription
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               customerId:
     *                 type: string
     *                 description: The ID of the customer canceling their subscription
     *             required:
     *               - customerId
     *     responses:
     *       200:
     *         description: Subscription canceled successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: object
     *                   description: Updated customer data after canceling the subscription
     *                 message:
     *                   type: string
     *                   example: Subscription Cancelled successfully
     *       400:
     *         description: Bad request, e.g., customer doesn't have an ongoing subscription
     *       500:
     *         description: Internal server error
     */
    router.post('/subscriptions/plans/:id/cancel', this.handlerRunner(actionsHandlers.CancelHandler))
    return router
  }

  async init () {
    this.logger.debug(`{APP} ${this.constructor.name} initialized...`)
  }
}

module.exports = { SubscriptionController }

