const models = require('../models');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
// https://stackoverflow.com/questions/1382107
class ThrowMyError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const create = async (name, email, password, role = 'user') => {
  if (!name || !email || !password) {
    throw new ThrowMyError('Invalid entries. Try again.', 'invalid_entries');
  }

  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!validEmail.test(email)) {
    throw new ThrowMyError('Invalid entries. Try again.', 'invalid_entries');
  }

  const userByMail = await models.users.findByMail(email);

  if (userByMail) {
    throw new ThrowMyError('Email already registered', 'email_already_exists');
  }

  return models.users.create(name, email, password, role);
};

module.exports = {
  create,
};
