
exports.up =  (knex, Promise) => {
  return knex.schema.createTable('portfolio', t => {
    t.increments()
    t.string('background')
    t.string('tag')
    t.string('eng_title')
    t.string('kor_title')
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.integer('creator').unsigned().notNullable()
    t.foreign('creator').references('user.id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('portfolio')
}
