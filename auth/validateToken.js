const jwt = require('jsonwebtoken');

const secret = require('./secret');

const validateToken = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = validateToken;
