const model = require('../models/usersModel');

const regEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

const create = async (name, email, password, role) => {
  if (!name || !email || !password || !email.match(regEmail)) {
    return {
      error: true,
      code: 'invalid_entries',
      message: 'Invalid entries. Try again.',
    };
  }
  const cEmail = await model.checkEmail(email);
  if (cEmail) {
    return {
      error: true,
      code: 'email_in_use',
      message: 'Email already registered',
    };
  }
  let retRole = 'user';
  if (role === 'admin') retRole = 'admin';
  const retorno = await model.create(name, email, password, retRole);
  return retorno;
};
const login = async (email, password) => {
  const cUser = await model.checkUSer(email, password);
  if (!email || !password || !email.match(regEmail) || !cUser) {
    return {
      error: true,
      code: 'invalid_login',
      message: 'All fields must be filled',
    };
  }
};
module.exports = {
  create,
  login,
};
