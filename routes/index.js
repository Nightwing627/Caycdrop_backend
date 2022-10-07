var express = require("express")
var router = express.Router()
const HomeContoller = require('../controller/home.controller')
const Util = require('../util')

/* GET home page. */
router.get("/home/featured",  HomeContoller.home)
router.get("/home/footer", HomeContoller.getFooterData)

router.post('/test/encrypt', function(req, res) {
  res.status(200).send(Util.encrypt(req.body.text))
})

router.post('/test/decrypt', function(req, res) {
  res.status(200).send(Util.decrypt(req.body.text))
})

router.post('/test/rand_token', function(req, res) {
  res.status(200).send(Util.generateCode(req.body.type))
})

module.exports = router
