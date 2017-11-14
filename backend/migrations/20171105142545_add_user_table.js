
exports.up = (knex, Promise) => {
  return knex.schema.createTable('user', t => {
    t.increments()
    t.string('user_id').notNullable().unique()
    t.string('provider').notNullable()
    t.string('nickname').notNullable()
    t.string('access_token')
    t.integer('authority').defaultTo(0)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user')
}