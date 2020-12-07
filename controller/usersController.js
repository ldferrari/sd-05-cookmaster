const Router = require('express');

const users = Router();

const service = require('../service/usersService');

users.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await service.createUser(name, email, password);
    if (newUser.err) {
      res.status(newUser.code).json({ message: newUser.message });
    }
    console.log(newUser);
    res.status(201).json({ users: newUser });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = users;
