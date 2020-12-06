const jwt = require('jsonwebtoken');
const secretKey = require('../models/secretKey');
const { findUserbyEmail } = require('../models/usersModels');

const secret = secretKey();
//
module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  const decoded = jwt.verify(token, secret);
  const user = await findUserbyEmail(decoded.data.user);
  if (!user) {
    return res.status(401).json({ message: 'Acess not authorized' });
  }
  req.user = user;
  next();
};
