const { Router } = require('express');

const users = Router();

const usersServices = require('../services/usersService');

users.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const novoUsuario = await usersServices.create(name, email, password);
    if (novoUsuario.error) {
      return res.status(novoUsuario.statusCode).json({ message: novoUsuario.message });
    }
    return res.status(201).json(novoUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = users;
