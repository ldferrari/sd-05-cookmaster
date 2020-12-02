const express = require('express');
const rescue = require('express-rescue');
const users = require('../models/users');
const { validateUser } = require('../middlewares/index');

const usersController = express.Router();

usersController.post('/', validateUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const createdUser = await users.add({ name, email, password });

  res.status(201).json(createdUser);
}));

module.exports = usersController;
