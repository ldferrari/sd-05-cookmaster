const express = require('express');
const rescue = require('express-rescue');
const { createUser } = require('../models/users');
const { verifyNewUser } = require('../services/users');

const usersController = express.Router();

// 1 - Crie um endpoint para o cadastro de usuários
usersController.post('/', verifyNewUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await createUser({ name, email, password });

  return res.status(201).json({ user: newUser });
}));

module.exports = usersController;
