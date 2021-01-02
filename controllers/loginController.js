const { Router } = require('express');
const jwt = require('jsonwebtoken');
// const service = require('../service/loginService');
const model = require('../models/loginModel');

const secret = 'lostartofkeepasecret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const route = Router();

route.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = await service.create(email, password);
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const user = await model.checkEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    if (user.error) {
      if (user.code === 'unauthorized_data') {
        return res.status(401).json({ message: user.message });
      }
      if (user.code === 'invalid_user') {
        return res.status(401).json({ message: user.message });
      }
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

module.exports = route;
