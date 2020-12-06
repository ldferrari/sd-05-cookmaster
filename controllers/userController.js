const { Router } = require('express');
const rescue = require('express-rescue');
const userModel = require('../models/ModelUser');
const { searchUser } = require('../middlewares/index');

const userRoute = Router();

userRoute.post('/', searchUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userModel.addUser(name, email, password);
  return res.status(201).json(newUser);
}));

module.exports = userRoute;
