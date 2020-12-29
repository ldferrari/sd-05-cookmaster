const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');
const { invalidToken } = require('../enumerators/ErrorsEnums');

const tokenIsValid = async (token) => {
  const payload = jwt.verify(token, process.env.SECRET);
  const user = await UserModel.findBy({ name: payload.userData.name });
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const validToken = await tokenIsValid(token);
    req.user = validToken;
    next();
  } catch (err) {
    return res.status(401).json(invalidToken);
  }
};

module.exports = { tokenIsValid, validateJWT };
