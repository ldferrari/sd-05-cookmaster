const jwt = require('jsonwebtoken');

const secret = require('./secret');

const CodeError = require('../errorClass/errorClass');

const validateToken = (token) => {
  const payload = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      throw new CodeError(401, err.message);
    }
    return decoded;
  });
  return payload;
};

module.exports = validateToken;

//  https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
//  https://www.npmjs.com/package/jsonwebtoken
//  https://stackoverflow.com/questions/38844137/jsonwebtoken-verify-always-return-only-iat-xxx
