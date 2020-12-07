const jwt = require('jsonwebtoken');

const tokenJWT = async (user) => {
  const secret = 'limpa_o_fogon';

  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const { password: _, ...userWithoutPassword } = user;
  const { _id: id } = userWithoutPassword;

  const payload = {
    sub: id,
    userData: userWithoutPassword,
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = tokenJWT;
