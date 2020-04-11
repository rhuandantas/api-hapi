
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.unique('email');
        table.string('password').notNullable();
        table.string('token');
        table.string('passwordResetToken');
        table.timestamp('passwordResetExpires');
        table.timestamp('last_login');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
