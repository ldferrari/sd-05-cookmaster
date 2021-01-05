const express = require('express');
const rescue = require('express-rescue');
const { verifyLogin } = require('../services/login');

const loginController = express.Router();

// 2 - Crie um endpoint para o login de usuários
loginController.post('/', verifyLogin, rescue(async (req, res) => {
  const token = 'asd';

  res.status(200).json(token);
}));

module.exports = loginController;
