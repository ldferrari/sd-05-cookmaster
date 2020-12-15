const { UserModel } = require('../models');
const { ROLES } = require('../enumerators/usersEnums');

const createUser = async (name, email, password, role = ROLES.user) => {
  const newUser = await UserModel.registerUser(name, email, password, role);
  return newUser;
};

module.exports = { createUser };
