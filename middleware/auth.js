const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  req.payload = payload;
  next();
};
