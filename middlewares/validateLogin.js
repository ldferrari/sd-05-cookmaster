const rescue = require('express-rescue');
const { findEmail } = require('../models/users');

const fillErr = { message: 'All fields must be filled' };
const incErr = { message: 'Incorrect username or password' };

const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const validateLogin = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) res.status(401).json(fillErr);

  if (!regex.test(email)) res.status(401).json(incErr);

  const result = await findEmail(email);

  if (!result || result.password !== password) res.status(401).json(incErr);

  next();
});

module.exports = validateLogin;
