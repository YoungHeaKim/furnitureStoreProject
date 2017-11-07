
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', t => {
    t.increments()
    t.string('user_id').notNullable()
    t.string('provider').notNullable()
    t.string('nickname').notNullable()
    t.string('access_token')
    t.integer('authority')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
