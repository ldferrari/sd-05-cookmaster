const userModel = require('../model/userModel');

const createUser = async (name, email, password) => {
  const newUser = await userModel.createUser(name, email, password);
  return newUser;
};

module.exports = { createUser };
