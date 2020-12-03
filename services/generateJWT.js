const jwt = require('jsonwebtoken');

const generateJWT = async (user) => {
  // 1/ Secret
  const secret = 'secret-stuff-here-what?';
  // 2/ Header
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  // 3/ Payload
  // First taking away sensible data
  const { password: _, ...userWithoutPassword } = user;
  const { _id: id } = userWithoutPassword;
  const payload = {
    sub: id,
    userData: userWithoutPassword,
  };
  // 4/ Signature
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = generateJWT;
