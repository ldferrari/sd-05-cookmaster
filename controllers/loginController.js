const { Router } = require('express');

const login = Router();

const jwt = require('jsonwebtoken');

const secret = '12345678';

const usersModel = require('../models/usersModel');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

login.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const getEmail = await usersModel.getEmail({ email });

    if (!getEmail) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const user = await usersModel.create(email);
    // Não pode colocar senha (informação sensível) no token!
    const { password: _, ...userWithoutPassword } = user;

    const payload = {
      iss: 'post_api',
      aud: 'identity',
      sub: user.id,
      userData: userWithoutPassword,
    };

    const token = jwt.sign(payload, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
  }
});

module.exports = login;
