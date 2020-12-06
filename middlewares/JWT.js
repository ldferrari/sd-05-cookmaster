const JWT = require('jsonwebtoken');

const tokenGenerator = (user) => {
  const secretKey = 'BIRL é melhor que Javascript';
  const jwtConfig = {
    expiresIn: '35m',
    algorithm: 'HS256',
  };

  const { password: _, ...payloadData } = user;

  const payload = {
    sub: payloadData.id,
    userData: payloadData,
  };

  const token = JWT.sign(payload, secretKey, jwtConfig);
  return token;
};

module.exports = tokenGenerator;
