const model = require('../models/loginModel');

const isEmailValid = (email) => {
  const emailRegexValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegexValidator.test(String(email).toLowerCase());
};

const create = async (user) => {
  const { email, password } = user;
  const emailExists = await model.getByEmail(email);
  if (!email || !password) {
    return {
      error: true,
      code: 'unauthorized_data',
      message: 'All fields must be filled',
    };
  }
  if (!isEmailValid(email)) {
    return {
      error: true,
      code: 'invalid_user',
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
  create,
};
