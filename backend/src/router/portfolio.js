const express = require('express')

const mw = require('../middleware')
const query = require('../query')

const app = express()

const router = express.Router()

router.use(mw.bodyParserJsonMiddleware)
router.use(mw.bodyParserUrlEncodedMiddleware)
router.use(mw.corsMiddleware)
router.use(mw.cookieSessionMiddleware)
router.use(mw.csrfMiddleware)
router.use(mw.insertToken)

router.post('/', (req, res) => {
  console.log(req.body.creator)
  const portfolio ={
    creator: req.body.creator,
    bgcolor: req.body.bgcolor,
    fontcolor: req.body.fontcolor,
    tag: req.body.tag,
    eng_title: req.body.eng_title,
    kor_title: req.body.kor_title
  }
  query.createPortfolio(portfolio)
    .then(() => {
      res.redirect('/auth/success')
    })
})

module.exports = router