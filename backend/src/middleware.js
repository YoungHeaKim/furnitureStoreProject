const expressJwt = require('express-jwt')
const cors = require('cors')
const bodyParser = require('body-parser')
const csurf = require('csurf')

const corsMiddleware = cors({
  origin: process.env.TARGET_ORIGIN
})

const jwtMiddleware = expressJwt({
  secret: process.env.SECRET
})

const bodyParserJsonMiddleware = bodyParser.json()

const bodyParserUrlEncodedMiddleware = bodyParser.urlencoded({ extended: false })

const csurfMiddleware = csurf()

function loginRequired(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  corsMiddleware,
  jwtMiddleware,
  bodyParserJsonMiddleware,
  bodyParserUrlEncodedMiddleware,
  csurfMiddleware,
  loginRequired
}