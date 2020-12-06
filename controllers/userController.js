const { Router } = require('express');
const rescue = require('express-rescue');

const userRouter = Router();
const userService = require('../services/userService');

userRouter.post(
  '/',
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await userService.createUser(name, email, password);
    return !newUser
      ? res.status(400).json({ message: 'User was not created' })
      : res.status(201).json(newUser);
  }),
);

module.exports = userRouter;
