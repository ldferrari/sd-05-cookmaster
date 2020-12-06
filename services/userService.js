const userModel = require('../models/userModel');

class ErrorCode extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

async function validateUser(name, email, password) {
  const RegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = RegEx.test(String(email).toLowerCase());

  if (!name || !email || !validEmail || !password) {
    throw new ErrorCode('Invalid entries. Try again.', 'invalid_data');
  }

  const checkEmail = await userModel.getUserByEmail(email);
  if (checkEmail) {
    throw new ErrorCode('Email already registered', 'conflict');
  }

  return true;
}

async function createUser(name, email, password) {
  const validUser = await validateUser(name, email, password);
  if (!validUser) return false;

  const addUser = await userModel.createUser(name, email, password);
  return { user: addUser };
}

async function loginUser(email, password) {
  if (!email || !password) {
    throw new ErrorCode('All fields must be filled', 'invalid_user');
  }

  const userProfile = await userModel.getUserByEmail(email);
  if (!userProfile || userProfile.password !== password) {
    throw new ErrorCode('Incorrect username or password', 'unauthorized');
  }

  return userProfile;
}

module.exports = { createUser, loginUser };
