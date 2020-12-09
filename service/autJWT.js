const jwt = require('jsonwebtoken');
const usersModels = require('../models/usersModels');

const funAuthorization = (async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return {
        err: true,
        message: 'jwt malformed',
        statusCode: 401,
      };
    }
    const secret = 'segredo';
    const payload = jwt.verify(auth, secret);
    const user = await usersModels.findByEmail(payload.useData);
    if (!user) {
      return {
        err: true,
        message: 'invalid token',
        statusCode: 400,
      };
    }
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

module.exports = funAuthorization;
