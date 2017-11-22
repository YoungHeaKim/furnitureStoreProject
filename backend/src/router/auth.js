const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const query = require('../query')
const mw = require('../middleware')

const app = express()

const router = express.Router()

// middleware
router.use(mw.bodyParserJsonMiddleware)
router.use(mw.bodyParserUrlEncodedMiddleware)
router.use(mw.corsMiddleware)
router.use(mw.cookieSessionMiddleware)
router.use(mw.csrfMiddleware)
router.use(mw.insertToken)
// passport
router.use(passport.initialize())
router.use(passport.session())

// Passport Serializer
passport.serializeUser((user, done) => {
  console.log('Serializser')
  done(null, user.id)  
})

// Passport Deserializser
passport.deserializeUser((user, done) => {
  console.log('Deserializser')
  const id = user
  query.getUserByID({id})
    .then(user => {
      if (user) {
        done(null, user)
      } else {
        done(new Error('해당 정보와 일치하는 사용자가 없습니다.'))
      }
    })
})

// Local Strategy
passport.use(new LocalStrategy({ usernameField: 'user_id' }, (user_id, password, done) => {
  query.getUserByUserId({user_id})
    .then(matched => {
      (matched && bcrypt.compareSync(password, matched.access_token))? done(null, matched) : done(new Error('아이디 또는 패스워드가 일치하지 않습니다.'))
    })
}))

// Local Register Router
router.post('/register', (req, res) => {
  const user_id = req.body.user_id,
        password = bcrypt.hashSync(req.body.password, 10),
        nickname = req.body.nickname
  query.getUserByUserId({user_id})
    .then(matched => {
      if (matched) {
        throw new Error ('이미 사용중인 아이디가 있습니다.')
      } else {
        query.createUser({user_id, password, nickname})
          .then(() => {
            res.redirect('/auth/login')
          })
      }
    })
})

// Local login Router
router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/login'
}))

module.exports = router