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

module.exports = {
  createUser,
};
