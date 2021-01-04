const jwt = require('jsonwebtoken');

const hasToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  jwt.verify(token, 'minha frase secreta', (err, decoded) => {
    if (err && err != null) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = decoded;
    return next();
  });
};

module.exports = hasToken;
