const adminModel = require('../models/adminModel');
const CodeError = require('../errorClass/errorClass');

const isAdmin = (role) => {
  if (role === 'user') {
    throw new CodeError(403, 'Only admins can register new admins');
  }
  return true;
};

const create = async (name, email, password) => adminModel.create(name, email, password);

module.exports = {
  isAdmin,
  create,
};
