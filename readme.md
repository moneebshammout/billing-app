# Billing App

## Introduction

This is a billing app microservice for a SaaS application. It handles subscription management, payment processing, and communication with other services in the system.

## System Design

![Billing_APP_SYSTEM_DESIGN drawio](https://github.com/user-attachments/assets/4cf473a9-b3d7-4240-918b-5bffbe6458b8)


## Database Design

![Billing_DB_Design](https://github.com/user-attachments/assets/2c90045d-546c-43c8-a261-1f58c9461b88)


## Customer Subscription Journey

The journey starts when a customer requests one of the subscription actions (e.g., subscribe). Here's how it works:

1. The customer interacts with the billing app.
2. The billing app contacts the authentication service to verify the customer's identity.
3. Upon successful verification, the billing app contacts the payment gateway to process the payment.
4. The subscription status is set to "processing."
5. The payment gateway sends an external webhook for the payment action result.
6. The billing app processes the result and sends it to the payment webhook queue.
7. If the payment action fails, the system retries up to 3 times and then sends an apology email to the customer.
8. If the payment action succeeds, the subscription status is updated to "eligible," and a thank-you email is sent to the customer.
9. The same process applies to other subscription actions.

## How to Run the App

1. Fill in the `.env` file based on the `.env.example` template.
2. Run `docker-compose up` to start the server.
3. The server will be running on `localhost:4000`.

## Deployment Strategy

We use the ECS (Elastic Container Service) for deployment due to its reliability, fault tolerance, and Docker support. Below is a simple ECS GitHub Action configuration:

```yaml
name: Deploy to ECS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up AWS CLI
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-west-2

    - name: Deploy to ECS
      run: |
        ecs deploy --cluster billing-sass --service billing service --image billing_app
```
