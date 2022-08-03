var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  const url = req.protocol + '://' + req.get('host')
  res.render('index', { title: 'Express', url })
})

module.exports = router
