const crypto = require('crypto')
const randToken = require('rand-token')
const nodemailer = require('nodemailer')
const sendgirdTransport = require('nodemailer-sendgrid-transport')

const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(24)
const iv = crypto.randomBytes(16)
const SENDGRID_API = process.env.SENDGRID_API_THOMAS

const transporter = nodemailer.createTransport(
  sendgirdTransport({
    auth: {
      api_key: SENDGRID_API
    }
  })
)

module.exports = {
  encrypt: (text) => {
    try {
      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted = cipher.update(text)
      encrypted = Buffer.concat([ encrypted, cipher.final() ]);
      return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };  
    } catch (error) {
      return { error: 'encrypt module error' }
    }
  },
  
  decrypt: (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex')
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([ decrypted, decipher.final() ]);
    return decrypted.toString();
  },

  generateCode: (type, length = 10) => {
    // const token = randToken.generate(length);
    // const sUID = randToken.suid(1)
    let prefix = '';
    const uId = randToken.uid(length)
    switch (type) {
      case "user":
        prefix = process.env.CODE_PREFIX_USER; break;
      case "account":
        prefix = process.env.CODE_PREFIX_ACCOUNT; break;
      case "box":
        prefix = process.env.CODE_PREFIX_BOX; break;
      case "item":
        prefix = process.env.CODE_PREFIX_ITEM; break;
      case "tag":
        prefix = process.env.CODE_PREFIX_TAG; break;
      case "pvp":
        prefix = process.env.CODE_PREFIX_PVP; break;
    }

    return prefix + uId;
  },

  sendEmail: (email, title, content) => {
    transporter.sendMail({
      to: email,
      from: process.env.FROM_ADDRESS,
      subject: title,
      html: content
    }).then(mailRes => {
      console.log('----sendEmail res----', mailRes)
      return true
    }).catch(mailErr => {
      console.log('----- send mail error ----- \n', mailErr)
      return false
    })
  }
}

// 61add9b0068d5d85e940ff3bba0a00e6