const JWT = require('jsonwebtoken');
const Errors = require('../services/Errors/index');

const secretKey = 'BIRL é melhor que Javascript';

const tokenGenerator = (user, id) => {
  const jwtConfig = {
    expiresIn: '35m',
    algorithm: 'HS256',
  };

  const { password: _, ...payloadData } = user;

  const payload = {
    sub: id,
    userData: { ...payloadData },
  };

  const token = JWT.sign(payload, secretKey, jwtConfig);
  return token;
};

const tokenVerifyer = (token) => {
  try {
    return JWT.verify(token, secretKey);
  } catch (err) {
    throw new Errors.AuthorizationFailed();
  }
};

module.exports = {
  tokenGenerator,
  tokenVerifyer,
};
