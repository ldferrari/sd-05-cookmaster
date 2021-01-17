const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services');

const validateJWT = require('../auth/validateJWT');

const users = Router();

// Endpoint de cadastro da pessoa usuária;
users.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await services.users.create(name, email, password);

  res.status(201).json({ user: newUser });
}));

users.post('/admin', validateJWT, rescue(async (req, res) => {
  const { user } = req;
  const { name, email, password } = req.body;

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const newUser = await services.users.create(name, email, password, 'admin');

  res.status(201).json({ user: newUser });
}));

module.exports = users;
