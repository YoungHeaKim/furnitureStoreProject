const faker = require('faker')

exports.seed = (knex, Promise) => {
  return knex('board')
  .then(() => {
    const arr = []
    // 한번 실행시 만개의 더미데이터 생성합니다.
    for(var i = 1; i <= 5000; i++) {
      arr.push(
        knex('board')
        .insert({
          title: faker.lorem.word(),
          content: faker.lorem.paragraphs(),
          created_at: faker.date.between('2017-11-01', '2017-12-31'),
          notify_type: Math.floor(Math.random()*2),
          creator: Math.floor(Math.random()*5)+1,
          board_type: Math.floor(Math.random()*8)+1,
        })
      )
    }
    return Promise.all(arr)
  })
}
