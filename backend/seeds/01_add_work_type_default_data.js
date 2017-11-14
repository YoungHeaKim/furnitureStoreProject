const workTypeList = [
  {type: 'branding'},
  {type: 'marketing'},
  {type: 'develop'}
]

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('work_type').del()
    .then(() => {
      return knex('work_type').insert(workTypeList)
    })
}
