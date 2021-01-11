const { Router } = require('express');
const userModel = require('../model/userModel');
const validationService = require('../service/validationService');

const routers = Router();

routers.post('/', async (req, res) => {
  validationService.validateNewUser(req, res);
  const { name, email, password } = req.body;
  const newUser = await userModel.createUser(name, email, password);
  if (!newUser) return res.status(400).json({ message: 'Cannot create User' });
  return res.status(201).json(newUser);
});

module.exports = routers;
