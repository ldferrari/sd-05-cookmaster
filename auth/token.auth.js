const jwt = require('jsonwebtoken');

const TIME_LIFE = 3600;
const SECRET = 'asd123';

const generateToken = (payload) => jwt.sign({
  // issuer: 'Cookmaster-server',
  // audience: 'Cookmaster-app',
  exp: Math.floor(Date.now() / 1000) + TIME_LIFE, // timelife
  payload,
}, SECRET);

const verifyToken = (token) => {
  try {
    return jwt.verify(
      token,
      SECRET,
    );
  } catch {
    throw new Error('jwt malformed');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
