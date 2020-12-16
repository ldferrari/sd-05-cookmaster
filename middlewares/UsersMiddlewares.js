const ErrorEnums = require('../enumerators/ErrorsEnums');
const { UserModel } = require('../models');

const pattern = new RegExp(/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/, 'i');

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json(ErrorEnums.missingFields);
  }
  if (!pattern.test(email)) {
    return res.status(401).json(ErrorEnums.incorrectFields);
  }
  next();
};

const verifyPassword = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await UserModel.findBy({ email });
  if (!password) {
    return res.status(401).json(ErrorEnums.missingFields);
  }
  if (!user || !user.password) {
    return res.status(401).json(ErrorEnums.incorrectFields);
  }
  if (password !== user.password) {
    return res.status(401).json(ErrorEnums.incorrectFields);
  }
  next();
};

const verifyUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !password) {
    return res.status(400).json(ErrorEnums.invalidEntries);
  }
  if (!email || !pattern.test(email)) {
    return res.status(400).json(ErrorEnums.invalidEntries);
  }
  const emailFound = await UserModel.findBy({ email });
  if (emailFound) {
    return res.status(409).json(ErrorEnums.emailExists);
  }
  next();
};

module.exports = { verifyUser, verifyEmail, verifyPassword };
