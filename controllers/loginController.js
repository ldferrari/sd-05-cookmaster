const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { findEmailModel } = require('../models/userModel');
// const validateEmail = require('../services/validateEmail');

const loginRouter = express.Router();

const secret = 'segredinho...bonitinho';

// class CodeError extends Error {
//   constructor(message, code) {
//     super(message);
//     this.code = code;
//   }
// }

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

loginRouter.post(
  '/',
  rescue(async (req, res) => {
    // try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: 'All fields must be filled' });
    }

    const user = await findEmailModel(email);

    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Incorrect username or password' });
    }

    const { password: _, ...userWithoutPassword } = user;
    // const { _id: id } = userWithoutPassword;
    const payload = {
      userWithoutPassword,
    };

    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(200).json({ token });
  }),
);

module.exports = loginRouter;
