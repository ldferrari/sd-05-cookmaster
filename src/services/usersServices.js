const model = require('../models/users');

const getAll = async () => model.getAll();

const checkEmail = (email) => {
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(String(email).toLowerCase());
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
  if (!checkEmail(email)) {
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
