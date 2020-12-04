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

module.exports = {
  // login,
  getAll,
  getById,
  create,
  // update,
  // exclude,
};
