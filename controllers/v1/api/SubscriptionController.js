const router = require('express').Router()

const plansHandlers = require('handlers/v1/api/subscriptionPlans')
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

    return router
  }

  async init () {
    this.logger.debug(`{APP} ${this.constructor.name} initialized...`)
  }
}

module.exports = { SubscriptionController }

