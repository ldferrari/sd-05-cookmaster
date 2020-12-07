const models = require('../models/index');
const Errors = require('./Errors/index');
const middlewares = require('../middlewares/index');

const createUser = async (name, email, password) => {
  const doesEmailExists = await models.users.findByEmail(email);
  const isItValid = middlewares.validateEmail(email);
  if (!name || !email || !password || !isItValid) {
    throw new Errors.InvalidEntries();
  }
  if (doesEmailExists) {
    throw new Errors.EmailAlreadyExists();
  }
  return models.users.create(name, email, password);
};

const login = async (email, password) => {
  const user = await models.users.login(email, password);
  if (!email || !password) {
    throw new Errors.RequiredFields();
  }
  if (!user) {
    throw new Errors.IncorrectEntries();
  }
  const { _id: id } = user;
  const token = middlewares.JWT.tokenGenerator(user, id);
  return { token };
};

module.exports = {
  createUser,
  login,
};
