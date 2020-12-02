const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { findEmail } = require('../models');

const jwtErr = { message: 'jwt malformed' };
const authErr = { message: 'missing auth token' };

const secret = 'abcd';

const validateToken = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json(authErr);
  }

  try {
    const verified = jwt.verify(token, secret);
    const user = await findEmail(verified.email);

    const { password, ...userWhitoutPass } = user;

    req.user = userWhitoutPass;

    return next();
  } catch (_) {
    res.status(401).json(jwtErr);
  }
});

module.exports = validateToken;
