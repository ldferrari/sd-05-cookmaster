const { Router } = require('express');
const jwt = require('jsonwebtoken');

const rescue = require('express-rescue');
const models = require('../models');

const login = Router();

const secret = 'MinhaSenhaSuperComplexaTrybe2021';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

// Endpoint de login da pessoa usuária;
login.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const userByMail = await models.users.findByMail(email);

  if (!userByMail || userByMail.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const { password: _, ...userWithoutPassword } = userByMail;

  const payload = { userWithoutPassword };

  const token = jwt.sign(payload, secret, jwtConfig);

  res.status(200).json({ token });
}));

module.exports = login;

// instruções jwt: https://app.betrybe.com/course/back-end/nodejs/jwt/conteudos/implementando-jwt?use_case=side_bar
