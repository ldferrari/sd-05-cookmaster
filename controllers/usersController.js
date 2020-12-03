const usersServices = require('../services/usersServices');

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await usersServices.validateUsers(name, email, password);
    const saida = await usersServices.create(name, email, password);
    res.status(201).json({ user: saida });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  create,
};
