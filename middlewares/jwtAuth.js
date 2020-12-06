const jwt = require('jsonwebtoken');

async function jwtAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const secret = 'Jessica Rabbit was my childhood crush!';
    const payload = jwt.verify(token, secret);
    req.userPayload = payload.userData;

    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
}

module.exports = jwtAuth;
