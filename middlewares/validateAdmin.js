const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { findEmail } = require('../models');

const admErr = { message: 'Only admins can register new admins' };
const authErr = { message: 'missing auth token' };

const secret = 'seraQueAgoraVai';

const validateAdmin = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json(authErr);
  }

  try {
    const verified = jwt.verify(token, secret);
    const user = await findEmail(verified.email);
    if (user.role === 'admin') {
      const { password, ...userWhitoutPass } = user;
      req.user = userWhitoutPass;

      return next();
    }
    return res.status(403).json(admErr);
  } catch {
    return res.status(403).json(admErr);
  }
});

module.exports = validateAdmin;
