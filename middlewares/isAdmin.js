const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const ModelUser = require('../models/ModelUser');

const secret = 'testeDeSecret';

const isAdmin = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const userVerified = jwt.verify(token, secret);
    const user = await ModelUser.hasEmail(userVerified.email);
    if (user.role === 'admin') {
      const { password: _, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;

      return next();
    }
    // return res.status(403).json({ message: 'Only admins can register new admins' });
  } catch {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
});

module.exports = isAdmin;
