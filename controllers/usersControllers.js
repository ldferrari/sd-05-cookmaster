const services = require('../services/index');
const Errors = require('../services/Errors/index');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await services.users.createUser(name, email, password);
    return res.status(201).json({ user });
  } catch (err) {
    if (err instanceof Errors.InvalidEntries) {
      return res.status(400).json({ message: err.message });
    }
    if (err instanceof Errors.EmailAlreadyExists) {
      return res.status(409).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: 'Algo deu Ruim no createUser do Controller' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await services.users.login(email, password);
    return res.status(200).json(token);
  } catch (err) {
    if (err instanceof Errors.IncorrectEntries) {
      return res.status(401).json({ message: err.message });
    }
    if (err instanceof Errors.RequiredFields) {
      return res.status(401).json({ message: err.message });
    }
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Algo deu Ruim no login do Controller' });
  }
};

module.exports = {
  createUser,
  login,
};
