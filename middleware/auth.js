const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

module.exports = (req, res, next) => {
  const token = req.header.authorization;
  if (!token) return res.status(401).json({ message: 'no_token' });
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({ message: 'error_token' });
  }
  req.payload = payload;
  next();
};
