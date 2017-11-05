require('dotenv').config()

const express = require('express')

const loginRouter = require('./router/login')

const app = express()

const PORT = process.env.PORT || 3000

app.use('/login', loginRouter)

server.listen(PORT, () => {
  console.log(`Able to connect to ${PORT}`)
})