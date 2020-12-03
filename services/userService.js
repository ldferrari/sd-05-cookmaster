// const { ObjectId } = require('mongodb');
const { addUserModel, findEmailModel } = require('../models/userModel');
const validateEmail = require('./validateEmail');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const addUserServ = async (name, email, password, role) => {
  // const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
  if (!name || !email || !password || !validateEmail(email)) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_entries');
  }
  // email já está cadastrado?
  const isThereEmail = await findEmailModel(email);

  // console.log('isthereemail', isThereEmail);

  if (isThereEmail) {
    throw new CodeError('Email already registered', 'duplicate_email');
  }

  console.log('.');
  return addUserModel(name, email, password, role);
};

module.exports = { addUserServ };
