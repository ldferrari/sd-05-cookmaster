const rescue = require('express-rescue');
const { findEmail } = require('../models');

const invalidErr = { message: 'Invalid entries. Try again.' };
const alreadyExistsErr = { message: 'Email already registered' };

const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const validateUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !regex.test(email) || !password) return res.status(400).json(invalidErr);

  const emailAlreadyExists = await findEmail(email);

  if (emailAlreadyExists) return res.status(409).json(alreadyExistsErr);

  next();
});

module.exports = validateUser;
