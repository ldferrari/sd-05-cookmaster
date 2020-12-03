const { Router } = require('express');
const jwt = require('jsonwebtoken');
const model = require('../models/loginModel');

const secret = 'calado';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const login = Router();

login.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401)
        .json({ message: 'All fields must be filled' });
    }

    const user = await model.getByEmail(email);

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or password' });
    }
    const { _id: id } = user;
    const { password: _, ...userWithoutPassword } = user;
    const payload = {
      iss: 'post-api',
      aud: 'identity',
      sub: id,
      userData: userWithoutPassword,
    };
    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Internal error', error: e });
  }
});

module.exports = login;
