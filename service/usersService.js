const usersModels = require('../models/usersModels');

function emailValido(email) {
  const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

const createUser = async (user) => {
  const { name, email, password } = user;
  const emailAlreadyExistes = await usersModels.findByEmail(email);
  if (!name || !email || !emailValido(email) || !password) {
    return {
      err: true,
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  if (emailAlreadyExistes) {
    return {
      err: true,
      message: 'Email already registered',
      statusCode: 409,
    };
  }
  return usersModels.createUser(name, email, password);
};

module.exports = {
  createUser,
};
