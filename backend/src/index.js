require('dotenv').config()

const http = require('http')
const express = require('express')

const authRouter = require('./router/auth')
const boardRouter = require('./router/board')
const mw = require('./middleware')

const app = express()
const server = http.Server(app)

const PORT = process.env.PORT || 3000

app.set('trust proxy')
app.set('view engine', 'pug')

app.use('/auth', authRouter)
app.use('/board', boardRouter)

app.get('/', (req, res) => {
  res.send('welcome')
})

// pug 회원가입
app.get('/auth/register', (req, res) => {
  res.render('register.pug')
})
// pug 로그인
app.get('/auth/login', (req, res) => {
  res.render('login.pug')
})


server.listen(PORT, () => {
  console.log(`Able to connect to ${PORT}`)
})

module.exports = server