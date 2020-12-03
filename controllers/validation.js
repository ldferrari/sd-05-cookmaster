// const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
// const { findEmailModel } = require('../models/userModel');

// const validation = express.Router();

const secret = 'segredinho...bonitinho';

const validation = rescue(async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log({token});

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const { userWithoutPassword } = jwt.verify(token, secret);

    req.user = userWithoutPassword;

    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
    next();
  }
});

module.exports = validation;
