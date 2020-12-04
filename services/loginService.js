const model = require('../models/usersModel');

const validateLogin = async (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return { error: true, message: 'All fields must be filled' };
  }

  const findEmail = await model.getByEmail(email);

  if (!findEmail) {
    return { error: true, message: 'Incorrect username or password' };
  }

  if (password !== findEmail.password) {
    return { error: true, message: 'Incorrect username or password' };
  }

  return findEmail;
};

module.exports = {
  validateLogin,
};
