const express = require('express');
const rescue = require('express-rescue');
const { add } = require('../models');
const { validateUser } = require('../middlewares/index');

const usersController = express.Router();

usersController.post('/', validateUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await add({ name, email, password });

  res.status(201).json({ user });
}));

module.exports = usersController;
