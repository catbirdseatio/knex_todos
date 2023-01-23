
exports.up = function(knex) {
  return knex.schema
    .createTable('todos', (table)=> {
        table.increments('id');
        table.boolean('completed');
        table.text('description');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('todos')
};
