const models = require('../models/index');
const Errors = require('./Errors/index');
const middlewares = require('../middlewares/index');

const createUser = async (name, email, password) => {
  const doesEmailExists = await models.users.findByEmail(email);
  const isItValid = middlewares.validateEmail(email);
  console.log(doesEmailExists);
  if (!name || !email || !password || !isItValid) {
    throw new Errors.InvalidEntries();
  }
  if (doesEmailExists) {
    throw new Errors.EmailAlreadyExists();
  }
  return models.users.create(name, email, password);
};

module.exports = {
  createUser,
};
