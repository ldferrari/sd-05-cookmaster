const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/usersService');

const users = Router();

users.post('/', rescue(async (req, res) => {
  const newUser = await service.create(req.body);

  return res.status(200).json({ user: newUser });
}));

module.exports = users;
