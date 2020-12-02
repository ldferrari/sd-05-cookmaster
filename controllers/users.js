const express = require('express');
const rescue = require('express-rescue');
const { addUser } = require('../models');
const { validateUser } = require('../middlewares/index');

const usersController = express.Router();

usersController.post('/', validateUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await addUser({ name, email, password });

  res.status(201).json({ user });
}));

module.exports = usersController;
