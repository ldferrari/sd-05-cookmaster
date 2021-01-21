const UserModel = require('../models/UserModel');

/*  ********************************************************************************************* */
const isValid = async (name, email, password, type = 'user') => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  console.log(`Name: ${name}\nEmail: ${email}\nPassword: ${password}\nvalidEmailS: ${regex.test(email)}`)
  if (!name || !email || !regex.test(email) || !password) {
    throw {
      code: 'invalid_data',
      message: 'Invalid entries, Try Again.',
    };
  }
  const existingEmail = await UserModel.findByEmail(email);
  if (existingEmail) {
    throw {
      code: 'conflict',
      message: 'Email already registered',
    };
  }
  return true;
};

const create = async (name, email, password, role = 'user') => {
  const validUser = await isValid(name, email, password);
  if (!validUser) return false;
  const newUser = await UserModel.create(name, email, password, role);
  return {
    user: newUser,
  };
};

const getAll = async () => UserModel.getAll();

module.exports = { create, getAll };
