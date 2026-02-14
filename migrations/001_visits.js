export function up(knex) {
  return knex.schema.createTable('visits', (table) => {
    table.increments('id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable('visits');
}
