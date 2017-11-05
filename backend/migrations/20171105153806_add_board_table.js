
exports.up = function(knex, Promise) {
  return knex.schema.createTable('board', t => {
    t.increments()
    t.string('title').notNullable()
    t.text('content', [mediumtext])
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.integer('notify_type').notNullable()
    t.integer('creator').unsigned().notNullable()
    t.foreign('creator').references('user.id')
    t.integer('board_type').unsigned().notNullable()
    t.foreign('board_type').references('board_type.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('board')
};
