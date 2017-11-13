const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieSession = require('cookie-session')

const passport = require('passport')
const query = require('../query')
const mw = require('../middleware')

const app = express()

const router = express.Router()

// middleware
router.use(mw.bodyParserJsonMiddleware)
router.use(mw.bodyParserUrlEncodedMiddleware)
router.use(mw.corsMiddleware)
router.use(cookieSession({
  name: 'oasess',
  keys: [
    process.env.SESSION_SECRET
  ]
}))
router.use(mw.csrfMiddleware)
router.use(mw.insertToken)
// passport
router.use(passport.initialize())
router.use(passport.session())

// Passport Serializer
passport.serializeUser((user, done) => {
  done(null, `${user.user_id}:${user.nickname}`)  
})

// Passport Deserializser
passport.deserializeUser((user, done) => {
  const [user_id, nickname] = user.split(':')
  query.getLocalUserById({user_id, nickname})
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
  query.checkAlreadyJoinId({user_id})
    .then(matched => {
      (matched && bcrypt.compareSync(password, matched.access_token))? done(null, matched) : done(new Error('아이디 또는 패스워드가 일치하지 않습니다.'))
    })
}))

// Local Register Router
router.post('/register', (req, res) => {
  const user_id = req.body.user_id,
        password = bcrypt.hashSync(req.body.password, 10),
        nickname = req.body.nickname
  query.checkAlreadyJoinId({user_id})
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

// Local Register Check ID Router
router.get('/register', (req, res) => {
  const user_id = req.query.user_id
  query.checkAlreadyJoinId({user_id})
    .then(data => {
      if(data){

      } else {

      }
    })
})

// Local login Router
// 로컬로그인 되는 코드
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login'
// }));

// Local Login Router Custom Callback
router.post('/login', (req, res, next) => {
  console.log('로그인 라우터')
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if(!user) {
      throw new Error ('아이디와 비밀번호를 입력해주세요.')
    }
    req.logIn(user, err => {
      if (err) {
        return next(err)
      }
      res.redirect('/auth/success')
    })
  })(req, res, next)
})

// Input Token
router.get('/success', mw.loginRequired, (req, res) => {
  const token = jwt.sign({
    id: req.user.id,
    expiresIn: '1d'
  }, process.env.SECRET)
  const origin = process.env.TARGET_ORIGIN
  res.send(`<script>window.opener.postMessage('${token}', '${origin}')</script>`)
})


module.exports = router