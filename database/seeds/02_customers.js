require('../../globals')()

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(async function () {
      // Inserts seed entries

      return knex('customers').insert([
        {
          id: 1,
          subscription_plan_id: 1,
          name: 'Ahmad',
          subscription_status: 'active',
          subscription_end_date: '2025-01-01'
        },
        {
          id: 2,
          name: 'mohammed'
        },
        {
          id: 3,
          subscription_plan_id: 2,
          name: 'ssalem',
          subscription_status: 'active',
          subscription_end_date: '2024-12-12'
        },
        {
          id: 4,
          subscription_plan_id: 3,
          name: 'sameer',
          subscription_status: 'overdue',
          subscription_end_date: '2023-12-12'
        }
      ])
    }).catch((error) => {
      console.log(error)
    })
}
