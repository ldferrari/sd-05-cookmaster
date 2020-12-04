const { ObjectId } = require('mongodb');
// const jwt = require('jsonwebtoken');
const model = require('../models/recipeModel');
// const userModel = require('../models/userModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!ingredients || !preparation || !name) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }

  const newRecipe = await model.create(name, ingredients, preparation, userId);
  // console.log(newRecipe);
  return newRecipe;
};

const getAll = async () => {
  const recipes = await model.getAll();
  return recipes;
};

const getById = async (id) => {
  // if (!id) {
  //   throw {
  //     code: 'not_found', message: 'Sale not found',
  //   };
  // }
  if (!ObjectId.isValid(id)) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  const recipe = await model.getById(id);

  if (!recipe) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  return recipe;
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
  // login,
  getAll,
  getById,
  create,
  // update,
  // exclude,
};
