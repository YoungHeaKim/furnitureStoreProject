const knex = require('../knex')

module.exports = {
  getUserByID({id}) {
    return knex('user')
      .where({'provider': 'local', id})
      .first()
      .select('id')
  },
  getUserByUserId({user_id}) {
    return knex('user')
    .where({'provider': 'local', user_id})
    .first()
  },
  createUser({user_id, password, nickname}) {
    return knex('user')
      .insert({
        'provider': 'local',
        user_id,
        'access_token': password,
        'nickname': nickname
    })
  },
}