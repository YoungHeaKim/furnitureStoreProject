const {...auth} = require('./authquery')  
const {...board} = require('./boardquery')

module.exports = {
  ...auth,
  ...board
}