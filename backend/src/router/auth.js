const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const csurf = require('csurf')
const express = require('express')
const jwt = require('jsonwebtoken')

const passport = require('passport')
const query = require('../registerquery')
const mw = require('../middleware')

const app = express()

const router = express.Router()

const oauthHandler = (req, res) => {
  const token = jwt.sign({
    id: req.user.id,
    expiresIn: '1d'
  }, process.env.SECRET)
  const origin = process.env.TARGET_ORIGIN
  res.send(`<script>window.opener.postMessage('${token}', '${origin}')</script>`)
}

router.use(passport.initialize())
router.use(passport.session())
router.use(mw.bodyParserJsonMiddleware)
router.use(mw.bodyParserUrlEncodedMiddleware)
router.use(mw.corsMiddleware)

app.set('view engine', 'pug')

passport.serializeUser((user, done) => {
  done(null, `${user.provider}:${user.provider_user_id}`)
})

passport.deserializeUser((str, done) => {
  const [provider, provider_user_id] = str.split(':')
  query.firstOrCreateUserByProvider(provider, provider_user_id)
    .then(user => {
      if (user) {
        done(null, user)
      } else {
        done(new Error('해당 정보와 일치하는 사용자가 없습니다.'))
      }
    })
})

passport.use(new LocalStrategy((user_id, password, done) => {
  query.getLocalUserById(user_id)
    .then(matched => {
      if(matched && bcrypt.compareSync(password, matched.access_token)){
        done(null, matched);
      }else{
        done(null, false, { message: '아이디 비번이 틀렸습니다ㅏ.' });
      }
    })
}))

router.get('/register', (req, res) => {
  res.render('register.pug')
})

router.post('/register', (req, res) => {
  console.log(req.body.user_id, req.body.password)
  query.createUser(req.body.user_id, bcrypt.hashSync(req.body.password, 10))
    .then(() => {
      res.redirect('/');
    })
})

router.post('/local', passport.authenticate('local', { session: false }), oauthHandler)

module.exports = router