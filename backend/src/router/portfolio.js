const express = require('express')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })

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
// single 파일 ()안 내용이 post될 name이랑 같아야한다.
router.post('/upload', upload.single('file'), (req,res) => {
  
})

module.exports = router