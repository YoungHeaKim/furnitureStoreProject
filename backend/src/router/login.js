const express = require('express')
const cors = require('cors')

const router = express.Router()

router.options('*', cors())

router.get('/', (req, res) => {
  res.render('login.pug')
})
