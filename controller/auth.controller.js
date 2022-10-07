const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../model/database")
const User = db.users
const Account = db.account
const ResetPassword = db.resetPassword
const UserVerify = db.userVerify
const Util = require('../util')

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      if (!(email && password)) {
        return res.status(400).send("Please input the credentials")
      }

      const user = await User.findOne({ where: { email } })

      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          { expiresIn: process.env.TOKEN_EXPIRE_TIME }
        )

        const refreshToken = jwt.sign(
          { user_id: user.id, email },
          process.env.REFRESH_TOKEN_KEY,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRED_TIME }
        )

        user.token = accessToken
        user.refresh_token = refreshToken
  
        await User.update(
          { token: accessToken, refresh_token: refreshToken },
          { where: { id: user.id } }
        )

        const account = await Account.findOne({
          attributes: { exclude: [ 'id' ]},
          where: { user_code: user.code }
        })

        return res.status(200).json({
          accessToken,
          refreshToken,
          user: account
        })
      }

      res.status(400).send("Email or Password is Invalid")
    } catch (error) {
      console.error(error)
    }
  },

  register: async (req, res) => {
    try {
      const { password, subscribe, agreeTerms } = req.body
      const email = req.body.email ? req.body.email.toLowerCase() : ''

      if (!(email && password)) {
        return res.status(400).send("Please input all informations")
      }

      if (!agreeTerms) {
        return res.status(400).send("please read and agree the Terms of Service")
      }

      let checkUser = await User.findOne({ where: { email } })
      if (checkUser) {
        return res
          .status(409)
          .json({ error: { email: "This email is already in use." } })
      }

      const enryptedPWD = await bcrypt.hash(password, 10)

      const newUser = await User.create({
        email,
        code: Util.generateCode('user'),
        password: enryptedPWD,
        is_subscribe: subscribe,
        is_termsService: agreeTerms,
      })

      const userCount = await User.count();

      let account = await Account.create({
        user_code: newUser.code,
        username: 'User#' + (51 + userCount),
        g_rank: 0,
        total_deposit: 0,
      })

      account = await Account.findOne({
        attributes: { exclude: [ 'id' ]},
        where: { id: account.id }
      })

      const accessToken = jwt.sign(
        { user_id: newUser.id, email },
        process.env.TOKEN_KEY,
        { expiresIn: process.env.TOKEN_EXPIRE_TIME }
      )

      await User.update({ token: accessToken }, { where: { id: newUser.id } })

      res.status(200).send('success')
    } catch (error) {
      console.log(error)
      res.status(400).send('User informations are wrong')
    }
  },

  refreshToken: async (req, res) => {
    let { refreshToken } = req.body;
    if (refreshToken.includes('"')) {
      refreshToken = refreshToken.split('"')[1]
    }
    try {
      const user = await User.findOne({ where: {
        refresh_token: refreshToken
      } })

      if (user) {
        const newAccessToken = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.TOKEN_KEY,
          { expiresIn: process.env.TOKEN_EXPIRE_TIME }
        )
  
        const newRefreshToken = jwt.sign(
          { user_id: user.id, email: user.email },
          process.env.REFRESH_TOKEN_KEY,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRED_TIME }
        )
        
        await User.update({ token: newAccessToken, refresh_token: newRefreshToken }, { where: { id: user.id } })
        
        return res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        })
      } else {
        return res.status(400).json('refreshToken is wrong')
      }
    } catch( err ) {
      return res.status(400).json('refreshToken is invalid')
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ where: { email } });

    if (user) {
      const token = Util.generateCode('', 200)
      await ResetPassword.create({
        user_code: user.code,
        token
      })

      const title = 'Reset Password Link - Caycdrop.web.app'
      const content = '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password/' + user.code +'?token=' + token + '">link</a> to reset your password</p>';
      
      if (Util.sendEmail(user.email, title, content)) {
        res.status(200).send('success')
      } else {
        res.status(501).send('Mail sending is failed')
      }
    } else {
      res.status(400).send('The Email is not registered with us')
    }
  },

  passwordReset: async (req, res) => {
    const { code, token, password } = req.body

    try {
      if (!(code && token && password)) {
        return res.status(400).send('Link or password is wrong')
      }

      let user = await User.findOne({ where: { code }})

      if (user) {
       const resetP = await ResetPassword.findAll({ where: { user_code: code, token }})
       if (resetP) {
        const enryptedPWD = await bcrypt.hash(password, 10)
        user = await User.update({ password: enryptedPWD }, { where: { id: user.id }})
        await ResetPassword.destroy({ where: { user_code: code}})
        console.log('---- password reset ----', user)
        return res.status(200).send('success')
       } else {
        res.status(405).send('This link is not correct')
       }
      } else {
        res.status(400).send('This user is invalid')
      }
    } catch (error) {
      res.status(400).send('error')
    }
  },

  sendEmailVerification: async (req, res) => {
    const { code } = req.body;

    const user = await User.findOne({ where: { code } });

    if (user) {
      if (!user.verified) {
        const token = Util.generateCode('', 200)
        await UserVerify.create({
          user_id: user.id,
          token
        })
        
        const title = 'Email Verification Link - Caycdrop.web.app'
        const content = '<p>Please click this <a href="http://localhost:5000/email_verify/u/' + user.code +'?token=' + token + '">link</a> to verify your email</p>';
        
        if (Util.sendEmail(user.email, title, content)) {
          res.status(200).send('success')
        } else {
          res.status(501).send('Mail sending is failed')
        }
      } else {
        res.status(400).send('This Email is already verified')
      }
    } else {
      res.status(400).send('The Email is not registered with us')
    }
  },

  emailVerify: async (req, res) => {
    const { code, token } = req.body

    try {
      const user = await User.findOne({ where: { code }})

      if (user) {
        const verify = await UserVerify.findOne({ where: { user_id: user.id, token }})
        if (verify) {
          await UserVerify.destroy({ where: { id: verify.id } })
          await User.update({ verified: true }, { where: { id: user.id } })
          res.status(200).send('success')
        } else {
          res.status(400).send('The informations are wrong')
        }
      } else {
        res.status(400).send('This user is invalid')
      }
    } catch (error) {
      res.status(400).send('error')
    }
  }
}

module.exports = AuthController
