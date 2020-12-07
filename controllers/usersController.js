const services = require('../services');

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await services.users.create(name, email, password, role);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'invalid_email') {
      return res.status(409).json({ message: err.message });
    }
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  create,
};
