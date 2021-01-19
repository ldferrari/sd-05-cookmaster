const express = require('express');
const rescue = require('express-rescue');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyNewUser, verifyNewAdmin } = require('../services/users');
const { createUser } = require('../models/users');

const usersController = express.Router();

// 11 - Bônus - Cadastramento de admin
usersController.post('/admin', verifyToken, verifyNewAdmin, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const adminInfos = { name, email, password };
  const newAdmin = await createUser(adminInfos, 'admin');

  return res.status(201).json({ user: newAdmin });
}));

// 1 - Crie um endpoint para o cadastro de usuários
usersController.post('/', verifyNewUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const userInfos = { name, email, password };
  const newUser = await createUser(userInfos, 'user');

  return res.status(201).json({ user: newUser });
}));

module.exports = usersController;
