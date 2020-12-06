const models = require('../models/usersModels');

const createUser = async (user) => models.createUser(user);

module.exports = {
  createUser,
};
