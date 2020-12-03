const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../services/usersServices');

const route = Router();

route.get('/', rescue(async (req, res) => {
  const allUsers = await service.getAll();
  res.status(200).json({ allUsers });
}));

route.post('/', rescue(async (req, res, next) => {
  const user = await service.create(req.body);
  if (user.error) {
    return next(user);
  }
  res.status(201).json({ user });
}));

module.exports = route;
