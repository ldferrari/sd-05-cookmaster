const { UsersServices } = require('../services');

const createUser = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const user = await UsersServices.createUser(name, email, password);
  res.status(201).json({ user });
};

module.exports = { createUser };
