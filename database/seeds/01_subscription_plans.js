require('../../globals')()

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('subscription_plans').del()
    .then(async function () {
      // Inserts seed entries
      return knex('subscription_plans').insert([
        {
          id: 1,
          name: 'Basic',
          isActive: true,
          price: '1000',
          discount: 50,
          billing_interval: 'monthly'
        },
        {
          id: 2,
          name: 'Pro',
          isActive: true,
          price: '2000',
          discount: 0,
          billing_interval: 'yearly'
        },
        {
          id: 3,
          name: 'Enterprise',
          isActive: true,
          price: '5000',
          discount: 0,
          billing_interval: 'yearly'
        },
        {
          id: 4,
          name: 'Enterprise',
          isActive: false,
          price: '5000',
          discount: 0,
          billing_interval: 'yearly'
        }
      ])
    }).catch((error) => {
      console.log(error)
    })
}
