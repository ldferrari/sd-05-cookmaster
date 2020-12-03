const express = require('express');
const rescue = require('express-rescue');
const { addUser } = require('../models');
const { validateUser, validateAdmin } = require('../middlewares/index');

const usersController = express.Router();

usersController.post('/admin', validateAdmin, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await addUser({ name, email, password }, 'admin');
  res.status(201).json({ user });
}));

usersController.post('/', validateUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await addUser({ name, email, password }, 'user');

  res.status(201).json({ user });
}));

module.exports = usersController;
