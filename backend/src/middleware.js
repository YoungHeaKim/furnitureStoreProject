const cors = require('cors')
const bodyParser = require('body-parser')
const csurf = require('csurf')
const cookieSession = require('cookie-session')

const corsMiddleware = cors({
  origin: process.env.TARGET_ORIGIN
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
    maxAge: 1000 * 60 * 60 * 8
  }
})

const insertToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()){
    next()
  }
  res.redirect('/auth/login')
}

module.exports = {
  corsMiddleware,
  bodyParserJsonMiddleware,
  bodyParserUrlEncodedMiddleware,
  csrfMiddleware,
  cookieSessionMiddleware,
  insertToken,
  checkAuthenticated
}