const mw = require('../middleware')
const query = require('../query')
const express = require('express')
const app = express()

const router = express.Router()

router.use(mw.bodyParserJsonMiddleware)
router.use(mw.bodyParserUrlEncodedMiddleware)
router.use(mw.corsMiddleware)

// 루트에 뿌려줄 게시판 리스트
router.get('/', (req, res) => {
  query.getBasicList()
    .then(list => res.send(list))
})

module.exports = router