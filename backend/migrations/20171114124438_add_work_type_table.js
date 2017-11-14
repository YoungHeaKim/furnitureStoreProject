
exports.up = (knex, Promise) => {
  return knex.schema.createTable('work_type', t => {
    t.increments()
    t.string('work_type')    
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('work_type')
};
