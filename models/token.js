const jwt = require('jsonwebtoken');

const secret = 'seraQueAgoraVai';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = createToken;
