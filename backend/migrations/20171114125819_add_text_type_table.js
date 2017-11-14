
exports.up = (knex, Promise) => {
  return knex.schema.createTable('text', t => {
    t.increments()
    t.text('web_main', 'tinytext')
    t.text('web_sub', 'mediumtext')
    t.text('mob_main', 'tinytext')
    t.text('mob_sub', 'mediumtext')
    t.integer('protfolio_id').unsigned().notNullable()
    t.foreign('protfolio_id').references('portfolio.id')
    t.integer('work_type_id').unsigned().notNullable()
    t.foreign('work_type_id').references('work_type.id')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('text')
}