const jwt = require('jsonwebtoken');
const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/loginService');

const login = Router();

const secret = 'senhaSecreta';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

login.post('/', rescue(async (req, res, next) => {
  const verifyLogin = await service.validateLogin(req.body);

  if (verifyLogin.error) {
    return next(verifyLogin);
  }

  const { password, name, ...userWithoutPassword } = verifyLogin;

  const payload = {
    iss: 'post-api',
    aud: 'identity',
    sub: verifyLogin.id,
    userData: userWithoutPassword,
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  res.status(200).json({ token });
}));

module.exports = login;
