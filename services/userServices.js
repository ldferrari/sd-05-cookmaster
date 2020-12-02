const { ObjectId } = require('mongodb');
const model = require('../models/userModel');
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


const create = async (user) => {
  if (!user) {
    throw {
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  const {name, email, password} = user;
  const role = "user";

  if (!email || !password || !name) {
    throw {
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i;
  
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) {
    throw {
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }

  const emailExists = await model.getUsersByEmail(email);

  if (emailExists) {
    throw {
      code: 'Conflict',
      message: 'Email already registered',
    };
  }
  const newUser = await model.createSales(email, password, name, role);

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
  //getAll,
  //getById,
  create,
  //update,
  //exclude,
};
