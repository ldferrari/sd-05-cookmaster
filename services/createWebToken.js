const jwt = require('jsonwebtoken');

async function createWebToken(user) {
  const secret = 'Jessica Rabbit was my childhood crush!';
  const jwtConfig = {
    expiresIn: '30m',
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
}

module.exports = createWebToken;
