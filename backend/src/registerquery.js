const knex = require('./knex')

module.exports = {
  firstOrCreateUserByProvider(provider, user_id, access_token=null) {
    return knex('user')
      .where({
        provider,
        user_id
      })
      .first()
      .then(user => {
        if (user) {
          return user
        } else {
          return knex('user')
            .insert({
              provider,
              provider_user_id,
              access_token
            })
            .then(([id]) => {
              return knex('user')
                .where({id})
                .first()
            })
        }
      })
  },
  getUserById(id) {
    return knex('user')
      .where({id})
      .first()
  },
  getLocalUserById(user_id) {
    return knex('user')
      .where({'provider': 'local', user_id})
      .first()
  },
  createUser(user_id, password) {
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
         })
      }
    })
  }
}