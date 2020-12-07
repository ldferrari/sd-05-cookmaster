/* const usersModel = require('../Models/usersModel');

const usersService = require('../Service/usersService');

const validUsers = async (name, email, password) => {
  const valid = await usersService.create(name, email, password);
  if (!valid) return false;
  const newUser = await usersModel.validUsers(name, email, password)
  return {
    user: newUser,
  };
};

module.exports = {
  validUsers,
};
 */
