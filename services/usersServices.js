// const { ObjectId } = require('mongodb');
const usersModel = require('../models/usersModel');

const isValid = async (name, email, password) => {
  const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
  const validEmail = regexEmail.test(String(email).toLowerCase());
  if (!name || !email || !validEmail || !password) {
    throw {
      code: 'invalid_data',
      message: 'Invalid entries. Try again',
    };
  }
  const existingEmail = await usersModel.getByEmail(email);
  console.log('mail existence checked');
  if (existingEmail) {
    throw {
      code: 'conflict',
      message: 'Email already registered',
    };
  }
  return true;
};

const create = async (name, email, password) => {
  const validUser = await isValid(name, email, password);
  if (!validUser) return false;
  const newUser = await usersModel.create(name, email, password);
  return {
    user: newUser,
  };
};

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   const productById = await prodModel.getById(id);
//   if (!productById) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   return productById;
// };

// const updateById = async (id, name, quantity) => {
//   const validProduct = await isValid(name, quantity);
//   if (!validProduct) return false;
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   await prodModel.updateById(id, name, quantity);
//   return {
//     _id: ObjectId(id),
//     name,
//     quantity,
//   };
// };

// const deleteById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   const deletedProd = await prodModel.deleteById(id);
//   if (!deletedProd) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   return deletedProd;
// };

module.exports = { create };
