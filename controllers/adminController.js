const adminServices = require('../services/adminServices');

const create = async (req, res) => {
  try {
    const { role } = req.validatedTokenInfo;
    const { name, email, password } = req.body;
    adminServices.isAdmin(role);
    const saida = await adminServices.create(name, email, password);
    res.status(201).json({ user: saida });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  create,
};
