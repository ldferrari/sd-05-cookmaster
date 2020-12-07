const model = require('../models');

// https://bit.ly/2VxAplp
class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const checkEmail = (mail) => mail.match(/\S+@\S+\.\S+/);

const create = async (name, email, password, role) => {
  const thisEmailExists = await model.users.findByEmail(email);

  if (thisEmailExists) {
    throw new CodeError('Email already registered', 'invalid_email');
  }
  // prettier-ignore
  if (
    !name
    || name === ''
    || !email
    || email === ''
    || !password
    || password === ''
    || !checkEmail(email)
  ) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_data');
  }

  const createdUser = await model.users.create(name, email, password, role);
  return createdUser;
};

const login = async (email, password) => {
  if (!password || password === '' || !email || email === '') {
    throw new CodeError('All fields must be filled', 'invalid_data');
  }

  const verifyUser = await model.users.findByEmail(email);

  if (!verifyUser || verifyUser.password !== password) {
    throw new CodeError('Incorrect username or password', 'incorrect_data');
  }

  return verifyUser;
};

module.exports = {
  create,
  login,
};
