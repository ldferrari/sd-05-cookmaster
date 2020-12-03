const jwt = require('jsonwebtoken');

const secret = require('./secret');

const headers = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = createToken;
