
exports.up = (knex, Promise) => {
  return knex.schema.createTable('image', t => {
    t.increments()
    t.string('web_list')
    t.string('web_title')
    t.string('mob_list')
    t.string('mob_title')
    t.integer('protfolio_id').unsigned().notNullable()
    t.foreign('protfolio_id').references('portfolio.id')
    t.integer('work_type_id').unsigned().notNullable()
    t.foreign('work_type_id').references('work_type.id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('image')
}
