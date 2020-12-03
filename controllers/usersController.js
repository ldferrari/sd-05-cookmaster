const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/usersService');

const users = Router();

users.post('/', rescue(async (req, res, next) => {
  const newUser = await service.create(req.body);

  if (newUser.error) {
    return next(newUser);
  }

  return res.status(201).json({ user: newUser });
}));

module.exports = users;
