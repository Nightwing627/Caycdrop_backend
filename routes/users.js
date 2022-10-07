var express = require("express")
var router = express.Router()
const auth = require("../middleware/auth")

/* GET users listing. */
router.get("/", auth, function (req, res) {
  res.send("respond with a resource")
})

module.exports = router
