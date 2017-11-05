
exports.up = function(knex, Promise) {
  return knex.schema.createTable('board_type', t => {
    t.increments()
    t.string('type').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('board_type')
};
