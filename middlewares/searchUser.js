const rescue = require('express-rescue');
const Model = require('../models/ModelUser');

const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const entriesErrorMessage = { message: 'Invalid entries. Try again.' };
const emailExists = { message: 'Email already registered' };

const searchUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !regEx.test(email) || !password) {
    return res.status(400).json(entriesErrorMessage);
  }

  const hasEmail = await Model.hasEmail(email);

  if (hasEmail) {
    return res.status(409).json(emailExists);
  }

  return next();
});

module.exports = searchUser;
