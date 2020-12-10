const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const wrongJwtFormat = { message: 'jwt malformed' };
const isNotValidToken = { message: 'missing auth token' };

const hasToken = rescue(async (req, res, next) => {
  try {
    const secret = 'testeDeSecret';
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json(isNotValidToken);
    }
    const payload = jwt.verify(token, secret);

    req.payloadWithoutPassword = payload.userData;

    return next();
  } catch (_err) {
    return res.status(401).json(wrongJwtFormat);
  }
});

module.exports = hasToken;
