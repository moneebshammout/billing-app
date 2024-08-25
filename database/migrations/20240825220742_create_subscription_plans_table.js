
exports.up = function(knex) {
    return knex.schema.createTable('subscription_plans', table => {
        table.increments('id').primary();
        table.string('name');
        table.boolean('is_active');
        table.string('price');
        table.integer('discount');
        table.string('billing_interval');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('subscription_plans');
};
