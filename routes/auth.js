const express = require("express")
const AuthController = require("../controller/auth.controller")

const router = express.Router()

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)
router.post('/refresh_token', AuthController.refreshToken)
router.get('/password_reset', AuthController.forgetPassword)
router.post('/password_reset', AuthController.passwordReset)
router.post('/verification_request', AuthController.sendEmailVerification)
router.post('/email_verify', AuthController.emailVerify)
module.exports = router
