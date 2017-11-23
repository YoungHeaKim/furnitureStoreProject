require('dotenv').config()

const http = require('http')
const express = require('express')

const authRouter = require('./router/auth')
const boardRouter = require('./router/board')
const portfolioRouter = require('./router/portfolio')
const mw = require('./middleware')

const app = express()
const server = http.Server(app)

const PORT = process.env.PORT || 3000

app.set('trust proxy')
app.set('view engine', 'pug')

app.use('/auth', authRouter)
app.use('/board', boardRouter)
app.use('/portfolio', portfolioRouter)

app.get('/', (req, res) => {
  res.send('welcome')
})

// pug 로그인
app.get('/auth/login', (req, res) => {
  res.render('login.pug')
})
// pug 회원가입
app.get('/auth/register', (req, res) => {
  res.render('register.pug')
})
// pug 포트폴리오
app.get('/portfolio', mw.checkAuthenticated, (req, res) => {
  res.render('portfolio.pug')
})
// pug success
app.get('/auth/success', mw.checkAuthenticated, (req, res) => {
  res.render('success.pug')
})

server.listen(PORT, () => {
  console.log(`Able to connect to ${PORT}`)
})

module.exports = server