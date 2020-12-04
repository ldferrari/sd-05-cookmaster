const model = require('../model/usersModel');

const createUser = async (name, email, password) => {
  if (!name || !email || !password || !email.match(/\S+@\S+\.\S+/)) {
    throw { code: 400, message: 'Invalid entries. Try again.' };
  }
  const emailExists = await model.getByEmail(email);
  if (emailExists) {
    throw { code: 409, message: 'Email already registered' };
  }
  return model.createUser(name, email, password);
};

const login = async (email, password) => {
  if (!email || !password) {
    throw { code: 401, message: 'All fields must be filled' };
  }
  const emailExists = await model.getByEmail(email);
  if (!emailExists || password !== emailExists.password) {
    throw { code: 401, message: 'Incorrect username or password' };
  }
  /* console.log(emailExists._id) */
  return emailExists._id;
};

module.exports = {
  createUser,
  login,
};
