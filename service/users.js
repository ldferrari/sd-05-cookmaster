const usersModel = require('../model').users;

const insertUserService = async (name, email, password) => {
  const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  if (!name || !password || !email || !regEx.test(email)) {
    return {
      code: 'invalidEntries',
      message: 'Invalid entries. Try again.',
    };
  }
  const existsUser = await usersModel.existsUser(email);
  if (existsUser) {
    return {
      code: 'emailExists',
      message: 'Email already registered',
    };
  }

  return usersModel.insertUser(name, password, email);
};

module.exports = {
  insertUserService,
};
