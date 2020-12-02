const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { findEmailModel } = require('../models/userModel');
const validateEmail = require('../services/validateEmail');

const loginRouter = express.Router();

const secret = 'segredinho...bonitinho';

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

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

    const user = findEmailModel(email);

    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Incorrect username or password' });
    }

    // if (!validateEmail(email)) {
    //   res.status(401).json({ message: 'Incorrect username or password' });
    // }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Erro interno', error: err });
    // }
  }),
);

module.exports = loginRouter;
