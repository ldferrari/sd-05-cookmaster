const express = require('express');
const rescue = require('express-rescue');
const um = require('../models/usersModel');
const uv = require('../services/userValidadion');

const appRouter = express.Router();

appRouter.post('/', uv.userValidate, rescue(async (req, res, _next) => {
  const { name, email, password, role } = req.body;
  const user = await um.createUser(name, email, password, role);
  // const user = await um.findByEmail(email);
  res.status(201).json({ user });
}));

module.exports = appRouter;
