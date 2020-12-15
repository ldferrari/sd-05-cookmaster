const { error } = require('../enumerators/usersEnums');
const { UserModel } = require('../models');

const pattern = new RegExp(/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/, 'i');

const verifyUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(error.invalidEntries);
  }
  if (!pattern.test(email)) {
    return res.status(400).json(error.invalidEntries);
  }
  const emailFound = await UserModel.findBy({ email });
  if (emailFound) {
    return res.status(409).json(error.emailExists);
  }
  next();
};

module.exports = { verifyUser };
