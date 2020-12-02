const { Router } = require('express');

const service = require('../service/usersService');

const route = Router();

route.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await service.create(name, email, password);
  if (newUser.error) {
    if (newUser.code === 'invalid_entries') {
      return res.status(400).json({ message: newUser.message });
    }
    if (newUser.code === 'email_in_use') {
      return res.status(409).json({ message: newUser.message });
    }
  }
  return res.status(201).json(newUser);
});
module.exports = route;
