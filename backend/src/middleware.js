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

const csrfMiddleware = csurf()

function insertToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken()
  next()
}

function loginRequired(req, res, next) {
  console.log(req.user)
  if (req.user) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

module.exports = {
  corsMiddleware,
  jwtMiddleware,
  bodyParserJsonMiddleware,
  bodyParserUrlEncodedMiddleware,
  csrfMiddleware,
  insertToken,
  loginRequired
}