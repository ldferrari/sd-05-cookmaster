const rescue = require('express-rescue');
const Model = require('../models/ModelUser');

const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const allFieldsError = { message: 'All fields must be filled' };
const emailOrPassIncorrect = { message: 'Incorrect username or password' };

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json(allFieldsError);
  }

  if (!regEx.test(email)) {
    return res.status(401).json(emailOrPassIncorrect);
  }

  const hasEmail = await Model.hasEmail(email);

  if (!hasEmail || hasEmail.password !== password) {
    return res.status(401).json(emailOrPassIncorrect);
  }

  return next();
});

module.exports = login;
