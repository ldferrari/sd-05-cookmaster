// const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

const secret = 'senhaUltraSigilosa!';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const login = async (body) => {
  if (!body) {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'All fields must be filled',
    };
  }
  const { email, password } = body;
  // console.log(email);

  if (!email || !password) {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'All fields must be filled',
    };
  }

  const user = await model.getUserByEmail(email);
  // console.log(user);
  if (!user || user.password !== password) {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'Incorrect username or password',
    };
  }

  const { password: _, ...userWithoutPassword } = user;
  // console.log(userWithoutPassword);

  const payload = {
    iss: 'post-api', // Issuer -> Quem emitiu o token
    aud: 'identity', // Audience -> Quem deve aceitar este token
    // sub: user._id, // Subject -> A quem se refere esse token
    userData: userWithoutPassword,
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  // console.log(token);
  return token;
};

// const productModel = require('../models/productsModel');

// const getAll = async () => model.getAllSales();

// const getById = async (id) => {
//   // if (!id) {
//   //   throw {
//   //     code: 'not_found', message: 'Sale not found',
//   //   };
//   // }
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'not_found', message: 'Sale not found',
//     };
//   }

//   const sales = await model.getSalesById(id);

//   if (!sales) {
//     throw {
//       code: 'not_found',
//       message: 'Sale not found',
//     };
//   }

//   return sales;
// };

const create = async (body) => {
  if (!body) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  const { name, email, password } = body;
  const role = 'user';

  if (!email || !password || !name) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }

  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i;

  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  // console.log(email);
  const emailExists = await model.getUserByEmail(email);
  // console.log(emailExists);
  if (emailExists) {
    return {
      error: true,
      code: 'Conflict',
      message: 'Email already registered',
    };
  }
  const newUser = await model.create(email, password, name, role);
  // console.log(newUser);
  return newUser;
};

// const update = async (id, productId, quantity) => {
//   if (!id) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   if (!productId || !quantity) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   if (!ObjectId.isValid(productId)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   if (quantity <= 0) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   const saleExists = await model.getSalesById(id);
//   if (!saleExists) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   const productExists = await productModel.getProductsById(productId);
//   if (!productExists) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong product ID or invalid quantity',
//     };
//   }
//   await model.updateSales(id, productId, quantity);
//   const updated = {
//     _id: id,
//     itensSold: [
//       { productId, quantity },
//     ],
//   };
//   // console.log(updated);
//   return updated;
// };

// const exclude = async (id) => {
//   if (!id) {
//     throw {
//       code: 'invalid_data', message: 'Wrong sale ID format',
//     };
//   }
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data', message: 'Wrong sale ID format',
//     };
//   }

// const { _id, itensSold } = await model.getSalesById(id);

// if (!_id || !itensSold) {
//   throw {
//     code: 'invalid_data', message: 'Wrong sale ID format',
//   };
// }

//   const excludedSale = await model.excludeSales(id);
//   console.log(excludedSale);
//   if (!excludedSale) {
//     throw {
//       code: 'invalid_data', message: 'Wrong sale ID format',
//     };
//   }
//   console.log(excludedSale);
//   return excludedSale;
// };

module.exports = {
  login,
  // getAll,
  // getById,
  create,
  // update,
  // exclude,
};
