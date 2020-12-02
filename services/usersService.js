const model = require('../models/usersModel');

const getAll = async () => model.getAll();

const isEmailValid = (email) => {
  const emailRegexValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegexValidator.test(String(email).toLowerCase());
};

const create = async (user) => {
  const { name, email, password } = user;
  const emailExists = await model.getByEmail(email);
  if (!name || !email || !password) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  if (!isEmailValid(email)) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  if (emailExists) {
    return {
      error: true,
      code: 'conflict',
      message: 'Email already registered',
    };
  }
  return model.create(user);
};

module.exports = {
  getAll,
  create,
};
