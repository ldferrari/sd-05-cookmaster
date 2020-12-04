const model = require('../models/login');

const checkEmail = (email) => {
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(String(email).toLowerCase());
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
  if (!checkEmail(email)) {
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
