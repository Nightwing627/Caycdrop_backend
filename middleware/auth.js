const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  var header = req.headers['authorization'];
  
  const token = header.split(' ')[1];
  // const token =
  //   req.body.user.accessToken || req.query.token || req.headers["x-access-token"]
  
  if (!header || !token) {
    return res.status(403).json("Token is required for authentication")
  }
  
  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY)
    req.body.user = user;
  } catch (error) {
    console.log('@@middleware:', error)
    return res.status(401).json("@Invalid Token")
  }
  return next()
}

module.exports = verifyToken
