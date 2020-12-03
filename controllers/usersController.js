const { Router } = require('express');

const usersRouter = Router();
const rescue = require('express-rescue');

const usersServices = require('../services/usersServices');
// const usersModel = require('../models/usersModel');

// 1 - Crie um endpoint para o cadastro de usuários
usersRouter.post(
  '/',
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const userCreated = await usersServices.create(name, email, password);
    if (!userCreated) return res.status(400).json({ message: 'User was not created' });
    return res.status(201).json(userCreated);
  }),
);

module.exports = usersRouter;
