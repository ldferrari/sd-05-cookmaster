const usersModel = require('../models/usersModel');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const isUserValid = async (name, email, password) => {
  const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
  const validEmail = regexEmail.test(String(email).toLowerCase());
  if (!name || !email || !validEmail || !password) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_data');
  }
  const existingEmail = await usersModel.getByEmail(email);
  // console.log('mail existence checked');
  if (existingEmail) {
    throw new CodeError('Email already registered', 'conflict');
  }
  return true;
};

const create = async (name, email, password) => {
  const validUser = await isUserValid(name, email, password);
  if (!validUser) return false;
  const newUser = await usersModel.create(name, email, password);
  return {
    user: newUser,
  };
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new CodeError('All fields must be filled', 'invalid_user');
  }
  const registeredUser = await usersModel.getByEmail(email);
  if (!registeredUser || registeredUser.password !== password) {
    throw new CodeError('Incorrect username or password', 'unauthorized');
  }
  return registeredUser;
};

module.exports = { create, login };
