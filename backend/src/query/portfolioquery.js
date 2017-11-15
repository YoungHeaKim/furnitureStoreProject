const knex = require('../knex')

module.exports = {
  createPortfolio({creator, bgcolor, fontcolor, tag, eng_title, kor_title}) {
    return knex('portfolio')
      .insert({
        creator,
        bgcolor,
        fontcolor,
        tag,
        eng_title,
        kor_title
      })
  },
}