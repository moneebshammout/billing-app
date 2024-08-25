
exports.up = function(knex) {
    return knex.schema.createTable('invoices', table => {
        table.increments('id').primary();
        table.integer('customer_id').references('id').inTable('customers');
        table.integer('subscription_plan');
        table.timestamp('subscription_start_date');
        table.timestamp('subscription_end_date');
        table.string('status');
        table.string('amount');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('invoices');
};
