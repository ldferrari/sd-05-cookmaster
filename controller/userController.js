const userService = require('../service/userService');
const {Router} = require('express');

const routers = Router();

routers.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userService.createUser(name, email, password);
  if (!newUser) return res.status(400).json({ message: 'Cannot create User' });
  return res.status(201).json(newUser);
});

module.exports = routers;
