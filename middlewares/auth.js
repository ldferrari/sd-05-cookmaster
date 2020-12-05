const jwt = require('jsonwebtoken');

const secret = 'setecrete';

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = auth;
