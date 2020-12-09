const { ObjectId } = require('mongodb');
const recipesModels = require('../models/recipesModels');

const createRecipe = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;

  if (!name || !ingredients || !preparation) {
    return {
      err: true,
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  return recipesModels.createRecipe(name, ingredients, preparation, userId);
};

const findByID = async (recipeId) => {
  if (!recipeId) {
    return {
      err: true,
      message: 'recipe not found',
      statusCode: 404,
    };
  }
  if (!ObjectId.isValid(recipeId)) {
    return {
      err: true,
      message: 'recipe not found',
      statusCode: 404,
    };
  }
  return recipesModels.findByID(recipeId);
};

module.exports = {
  createRecipe,
  findByID,
};
