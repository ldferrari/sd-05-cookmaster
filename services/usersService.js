const usersModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
  const emailExists = await usersModel.checkEmail(email);

  if (emailExists) {
    return { error: true, statusCode: 409, message: 'Email already registered' };
  }

  return usersModel.createUser(name, email, password);
};

module.exports = {
  createUser,
};
