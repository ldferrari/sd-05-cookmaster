const { UsersServices } = require('../services');
const { ROLES } = require('../enumerators/usersEnums');

const createUser = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const user = await UsersServices.createUser(name, email, password);
  res.status(201).json({ user });
};

const createAdmin = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const user = await UsersServices.createUser(name, email, password, ROLES.admin);
  res.status(201).json({ user });
};

module.exports = { createUser, createAdmin };
