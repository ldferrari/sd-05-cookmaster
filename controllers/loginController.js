const { Router } = require('express');
const rescue = require('express-rescue');

const loginRouter = Router();

const userService = require('../services/userService');
const createWebToken = require('../services/createWebToken');

loginRouter.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;

    const userLogin = await userService.loginUser(email, password);
    if (!userLogin) return res.status(400).json({ message: 'Login failed' });

    const token = await createWebToken(userLogin);
    return res.status(200).json({ token });
  }),
);

module.exports = loginRouter;
