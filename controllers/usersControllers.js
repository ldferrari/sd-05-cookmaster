const services = require('../services/index');

createUser = async (req, res) => {
  try {

  } catch (err) {
    res
      .status(500)
      .json({ message: 'Algo deu Ruim no createUser do Controller' });
  }
};
