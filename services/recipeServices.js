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

module.exports = {
  // login,
  // getAll,
  // getById,
  create,
  // update,
  // exclude,
};
