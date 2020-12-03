const express = require('express');
const rescue = require('express-rescue');
// const { addUserModel } = require('../models/userModel');
const { addUserServ } = require('../services/userService');

const userRouter = express.Router();

userRouter.post(
  '/',
  rescue(async (req, res) => {
    // console.log('req', req);
    const { name, email, password } = req.body;
    const role = 'user';

    const userAdded = await addUserServ(name, email, password, role);

    res.status(201).json({ user: userAdded });
  }),
);

module.exports = userRouter;
