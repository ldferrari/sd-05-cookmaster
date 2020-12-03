const model = require('../models/usersModel');

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const create = async (body) => {
  const { name, email, password } = body;

  const findEmail = await model.getByEmail(email);

  if (findEmail) {
    return { error: true, message: 'Email already registered' };
  }

  if (!name || !email || !password || !validateEmail(email)) {
    return { error: true, message: 'Invalid entries. Try again.' };
  }

  return model.create(body);
};

module.exports = {
  create,
};
