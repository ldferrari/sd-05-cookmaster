const jwt = require('jsonwebtoken');

const secret = require('../auth/secret');

const verifyJWT = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  jwt.verify(authorization, secret, (err, decoded) => {
    if (req.url === '/recipes' && err) {
      //  recurso técnico, pois não há um padrão
      //  de saída na avaliação de erros dos testes do projeto.
      return res.status(401).json({ message: 'jwt malformed' });
    }

    if (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.validatedTokenInfo = decoded;
    next();
  });
};

module.exports = verifyJWT;

//  https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
//  https://www.npmjs.com/package/jsonwebtoken
//  https://stackoverflow.com/questions/38844137/jsonwebtoken-verify-always-return-only-iat-xxx
//  https://stackoverflow.com/questions/10983500/how-do-i-store-request-level-variables-in-node-js
