const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const secret = 'freezerAnotche';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, secret);

    const user = await userModel.getByEmail(payload.userData.email);

    if (!user) throw new Error({ code: 'invalid_user', message: 'Invalid entries. Try again.' });

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
