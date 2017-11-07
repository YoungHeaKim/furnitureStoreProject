const {...auth} = require('./authquery')  
const {...list} = require('./listquery')

module.exports = {
  ...auth,
  ...list
}