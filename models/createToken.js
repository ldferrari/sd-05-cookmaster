const jwt = require('jsonwebtoken');

const secret = 'shhhh... this is secret';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createNewToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = createNewToken;
