const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');
const { invalidToken, missingToken, notAdmin } = require('../enumerators/ErrorsEnums');
const { ROLES } = require('../enumerators/usersEnums');

const tokenIsValid = async (token) => {
  const payload = jwt.verify(token, process.env.SECRET);
  const user = await UserModel.findBy({ name: payload.userData.name });
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send(missingToken);
  }
  try {
    const validToken = await tokenIsValid(token);
    req.user = validToken;
    next();
  } catch (err) {
    return res.status(401).json(invalidToken);
  }
};

const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== ROLES.admin) {
    return res.status(403).send(notAdmin);
  }
  next();
};

module.exports = { tokenIsValid, validateJWT, isAdmin };
