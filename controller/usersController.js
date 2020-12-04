const Router = require('express');

const users = Router();

const service = require('../service/usersService');

users.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await service.createUser(name, email, password);
    console.log(newUser);
    res.status(201).json({ users: newUser });
  } catch (e) {
    res.status(e.code).json({ message: e.message });
  }
});

module.exports = users;
