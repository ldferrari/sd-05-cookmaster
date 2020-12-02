const model = require('../models/usersModel');

const create = async (name, email, password) => {
  const regEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
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
  const retorno = await model.create(name, email, password);
  return retorno;
};
// const login = async (email, password) => {
//   if
// }
module.exports = {
  create,
};
