const { RecipesModel } = require('../models');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await RecipesModel.createRecipe(name, ingredients, preparation, userId);
  return newRecipe;
};

module.exports = { createRecipe };
