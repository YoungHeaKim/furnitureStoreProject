
exports.up = (knex, Promise) => {
  return knex.schema.createTable('worker', t => {
    t.increments()
    t.string('position')
    t.string('name')
    t.string('company')
    t.integer('protfolio_id').unsigned().notNullable()
    t.foreign('protfolio_id').references('portfolio.id')
    t.integer('work_type_id').unsigned().notNullable()
    t.foreign('work_type_id').references('work_type.id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('worker')
}