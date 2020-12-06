const rescue = require('express-rescue');
const services = require('../services/usersServices');

const createUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await services.createUser({ name, email, password, role: 'user' });
  res.status(201).json(user);
});

module.exports = {
  createUser,
};
