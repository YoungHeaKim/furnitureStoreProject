const knex = require('../knex')

module.exports = {
  getLocalUserById({user_id, nickname}) {
    return knex('user')
      .where({'provider': 'local', user_id, nickname})
      .first()
  },
  checkAlreadyJoinId({user_id}) {
    return knex('user')
    .where({'provider': 'local', user_id})
    .first()
  },
  createUser({user_id, password, nickname}) {
    return knex('user')
    .where({
      'provider': 'local',
      user_id
    })
    .first()
    .then(user => {
      if (user) {
        return user
      } else {
        return knex('user')
          .insert({
            'provider': 'local',
            user_id,
            'access_token': password,
            'nickname': nickname
         })
      }
    })
  },
}