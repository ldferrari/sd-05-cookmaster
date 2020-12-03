const usersServices = require('../services/usersServices');
const createToken = require('../auth/createToken');

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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDataBaseInfo = await usersServices.validateLogin(email, password);
    const { _id, role } = userDataBaseInfo;
    const token = createToken({ id: _id, email, role });
    res.status(200).json({ token });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  create,
  login,
};
