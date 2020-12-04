const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const secret = 'calado';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  console.log(token);
  try {
    const payload = jwt.verify(token, secret, {
      audience: 'identity',
      issuer: 'post-api',
    });

    const user = await userModel.getByEmail(payload.userData.email);

    if (!user) throw new Error({ code: 'invalid_user', message: 'Invalid entries. Try again.' });

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
