const express = require('express');
const rescue = require('express-rescue');
const { validateLogin } = require('../middlewares/index');

const loginController = express.Router();

loginController.post('/', validateLogin, rescue(async (req, res) => {
  const token = 'asd';

  res.status(200).json(token);
}));

module.exports = loginController;
