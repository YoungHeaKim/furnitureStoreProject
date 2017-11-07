const faker = require('faker')
const bcrypt = require('bcrypt')

const userList = [
  {
    user_id: 'haha',
    provider: 'local',
    nickname: faker.name.firstName(),
    access_token: bcrypt.hashSync('haha', 10),
    authority: 1
  },
  {
    user_id: 'hoho',
    provider: 'local',
    nickname: faker.name.firstName(),
    access_token: bcrypt.hashSync('hoho', 10),
    authority: 1
  },
  {
    user_id: '1234',
    provider: 'local',
    nickname: faker.name.firstName(),
    access_token: bcrypt.hashSync('1234', 10),
    authority: 0
  },
  {
    user_id: 'qwerty',
    provider: 'local',
    nickname: faker.name.firstName(),
    access_token: bcrypt.hashSync('qwerty', 10),
    authority: 1
  },
  {
    user_id: 'kaka',
    provider: 'local',
    nickname: faker.name.firstName(),
    access_token: bcrypt.hashSync('kaka', 10),
    authority: 0
  }
]

exports.seed = (knex, Promise) => {
  return knex('user').del()
    .then(() => {
      return knex('user').insert(userList);
    })
}
