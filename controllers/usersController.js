const { Router } = require('express');

const usersRouter = Router();
// const rescue = require('express-rescue');

const usersServices = require('../services/usersServices');
// const usersModel = require('../models/usersModel');

// 1 - Crie um endpoint para o cadastro de usuários
usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userCreated = await usersServices.create(name, email, password);
    if (!userCreated) return res.status(400).json({ message: 'User was not created' });
    return res.status(201).json(userCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(400).json({ message: err.message });
    }
    if (err.code === 'conflict') {
      return res.status(409).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

module.exports = usersRouter;
