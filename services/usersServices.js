const usersModel = require('../models/usersModel');

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

class CodeError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

const validateUsers = async (name, email, password) => {
  if (!name || !email || !validateEmail(email) || !password) {
    throw new CodeError(400, 'Invalid entries. Try again.');
  }
  const check = await usersModel.checkEmail(email);
  if (check !== null) {
    throw new CodeError(409, 'Email already registered');
  }
  return true;
};

const create = async (name, email, password) => usersModel.create(name, email, password);

module.exports = {
  validateUsers,
  create,
};

//  https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error
