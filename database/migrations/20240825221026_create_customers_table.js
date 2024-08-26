
exports.up = function(knex) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary();
        table.integer('subscription_plan_id').references('id').inTable('subscription_plans').nullable();
        table.string('name');
        table.string('subscription_status');
        table.timestamp('subscription_end_date');
        table.boolean('auto_renew_subscription');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('customers');
};
