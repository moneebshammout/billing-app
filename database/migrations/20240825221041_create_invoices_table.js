
exports.up = function(knex) {
    return knex.schema.createTable('invoices', table => {
        table.increments('id').primary();
        table.integer('customer_id').references('id').inTable('customers');
        table.jsonb('data');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('invoices');
};
