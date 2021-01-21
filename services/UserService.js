const UserModel = require('../models/UserModel');
const erroSender = require('./errorService');

/*  ********************************************************************************************* */
const isValid = async (name, email, password) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  console.log(name, email, password);
  if (!name || !email || !regex.test(email) || !password) {
    throw erroSender('invalid_entries', 'Invalid entries. Try again.');
  }
  const existingEmail = await UserModel.findByEmail(email);
  if (existingEmail) {
    throw erroSender('email_used', 'Email already registered');
  }
  return true;
};

const create = async (name, email, password, role = 'user') => {
  const validUser = await isValid(name, email, password);
  if (!validUser) return false;
  const newUser = await UserModel.create(name, email, password, role);
  return {
    user: newUser,
  };
};

const getAll = async () => UserModel.getAll();

module.exports = { create, getAll };
