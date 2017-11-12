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

app.use('/auth', authRouter)
app.use('/board', boardRouter)
// app.use(mw.csrfMiddleware)
// app.use(mw.insertToken)

app.get('/', (req, res) => {
  res.send('welcome')
})

server.listen(PORT, () => {
  console.log(`Able to connect to ${PORT}`)
})

module.exports = server