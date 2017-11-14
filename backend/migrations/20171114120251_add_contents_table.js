
exports.up = (knex, Promise) => {
  return knex.schema.createTable('contents', t => {
    t.increments()
    t.integer('exposed')
    t.integer('range')
    t.integer('activities')
    t.integer('like')
    t.integer('protfolio_id').unsigned().notNullable()
    t.foreign('protfolio_id').references('portfolio.id')
    t.integer('work_type_id').unsigned().notNullable()
    t.foreign('work_type_id').references('work_type.id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('contents')
}