const jwt = require('jsonwebtoken');

const secret = 'batata';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const express = require('express');
const rescue = require('express-rescue');
const um = require('../models/usersModel');
const uv = require('../services/userValidadion');

const appRouter = express.Router();

appRouter.post('/users', uv.userValidate, rescue(async (req, res, _next) => {
  const { name, email, password, role } = req.body;
  const user = await um.createUser(name, email, password, role);
  // const user = await um.findByEmail(email);
  res.status(201).json({ user });
}));

appRouter.post('/login', uv.loginValidate, rescue(async (req, res, _next) => {
  const token = await jwt.sign({ data: req.body }, secret, jwtConfig);
  res.status(200).json({ token });
}));

module.exports = appRouter;
