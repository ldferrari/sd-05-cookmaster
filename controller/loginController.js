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
    if (user.err) {
      return res.status(user.code).json({ message: user.message });
    }
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

module.exports = login;
