const model = require('../model/usersModel');

const createUser = async (name, email, password) => {
  if (!name || !email || !password || !email.match(/\S+@\S+\.\S+/)) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 400, message: 'Invalid entries. Try again.' };
  }
  const emailExists = await model.getByEmail(email);
  if (emailExists) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 409, message: 'Email already registered' };
  }
  return model.createUser(name, email, password);
};

const login = async (email, password1) => {
  if (!email || !password1) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 401, message: 'All fields must be filled' };
  }
  const emailExists = await model.getByEmail(email);
  if (!emailExists || password1 !== emailExists.password) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 401, message: 'Incorrect username or password' };
  }
  const { password: _, ...userData } = emailExists;
  console.log(userData);
  return userData;
};

module.exports = {
  createUser,
  login,
};
