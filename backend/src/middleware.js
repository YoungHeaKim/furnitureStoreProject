const expressJwt = require('express-jwt')
const cors = require('cors')
const bodyParser = require('body-parser')
const csurf = require('csurf')
const cookieSession = require('cookie-session')

const corsMiddleware = cors({
  origin: process.env.TARGET_ORIGIN
})

const jwtMiddleware = expressJwt({
  secret: process.env.SECRET
})

const bodyParserJsonMiddleware = bodyParser.json()

const bodyParserUrlEncodedMiddleware = bodyParser.urlencoded({ extended: false })

const csrfMiddleware = csurf()

const cookieSessionMiddleware = cookieSession({
  name: 'bat',
  keys: [
    process.env.SESSION_SECRET
  ],
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
})

const insertToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}

const loginRequired = (req, res, next) => {
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
  cookieSessionMiddleware,
  insertToken,
  loginRequired
}