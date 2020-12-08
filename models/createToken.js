const jwt = require('jsonwebtoken');

const createNewToken = async (user) => {
  const secret = 'testeDeSecret';

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

module.exports = createNewToken;
