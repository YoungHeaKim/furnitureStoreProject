const {...auth} = require('./authquery')  
const {...board} = require('./boardquery')
const {...portfolio} = require('./portfolioquery')

module.exports = {
  ...auth,
  ...board,
  ...portfolio
}