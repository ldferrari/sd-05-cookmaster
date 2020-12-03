const model = require('../models/loginModel');

const isEmailValid = (email) => {
  const emailRegexValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegexValidator.test(String(email).toLowerCase());
};

const create = async (user) => {
  const { email, password } = user;
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
      message: 'Incorrect username or password',
    };
  }
  return model.create(user);
};

module.exports = {
  create,
};
