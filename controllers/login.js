const express = require('express');
const rescue = require('express-rescue');
const { verifyLogin } = require('../services/login');
const { generateToken } = require('../services/generateToken');

const loginController = express.Router();

// 2 - Crie um endpoint para o login de usuários
loginController.post('/', verifyLogin, rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };
  const token = await generateToken(user);
  return res.status(200).json({ token });
}));

module.exports = loginController;
