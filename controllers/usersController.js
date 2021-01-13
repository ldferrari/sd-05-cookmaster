const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services');

const users = Router();

// Endpoint de cadastro da pessoa usuária;
users.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await services.users.create(name, email, password);

  res.status(201).json({ user: newUser });
}));

module.exports = users;
