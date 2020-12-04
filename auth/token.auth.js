const jwt = require('jsonwebtoken');

const TIME_LIFE = 3600;
const SECRET = 'asd123';

const generateToken = (payload) => jwt.sign({
  // issuer: 'Cookmaster-server',
  // audience: 'Cookmaster-app',
  exp: TIME_LIFE, // timelife
  payload,
}, SECRET);

const verifyToken = (token) => jwt.verify(
  token,
  SECRET,
);

module.exports = {
  generateToken,
  verifyToken,
};
