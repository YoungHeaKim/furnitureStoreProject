const knex = require('../knex')

module.exports = {
  getUserByUserIdAndNickname({user_id, nickname}) {
    return knex('user')
      .where({'provider': 'local', user_id, nickname})
      .first()
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