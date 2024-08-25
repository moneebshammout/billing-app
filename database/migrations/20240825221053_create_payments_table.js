
exports.up = function(knex) {
    return knex.schema.createTable('payments', table => {
        table.increments('id').primary();
        table.integer('invoice_id').references('id').inTable('invoices').nullable();
        table.string('payment_method');
        table.timestamp('created_at');
        table.timestamp('updated_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('payments');
};
