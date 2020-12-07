const Router = require('express');

const login = Router();

const jwt = require('jsonwebtoken');

const service = require('../service/usersService');

const secret = 'thebeatlesÉsuperestimado';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

login.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email, password);
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(e.code).json({ message: e.message });
  }
});

module.exports = login;
