const { Router } = require('express');
const rescue = require('express-rescue');

const services = require('../services/usersService');

const users = Router();

users.get('/', rescue(async (req, res) => {
  const allUsers = await services.getAll();
  res.status(200).json({ allUsers });
}));

users.post('/', rescue(async (req, res, next) => {
  const user = await services.create(req.body);
  if (user.error) {
    return next(user);
  }
  res.status(201).json({ user });
}));

module.exports = users;
