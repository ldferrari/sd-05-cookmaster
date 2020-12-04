const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

const secret = 'setecrete';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateLogin = async (email, password) => {
  const userId = await loginModel.verifyUser(email, password);

  if (!userId) {
    return { error: true, statusCode: 401, message: 'Incorrect username or password' };
  }

  const token = jwt.sign({ userId }, secret, jwtConfig);
  return { token };
};

module.exports = {
  validateLogin,
};
