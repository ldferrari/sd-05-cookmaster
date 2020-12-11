const { Router } = require('express');
const rescue = require('express-rescue');
const userModel = require('../models/ModelUser');
const { searchUser, isAdmin } = require('../middlewares');

const userRoute = Router();

userRoute.post('/admin', isAdmin, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.addUser({ name, email, password }, 'admin');
  res.status(201).json({ user });
}));

userRoute.post('/', searchUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.addUser({ name, email, password }, 'user');
  return res.status(201).json({ user });
}));

module.exports = userRoute;
