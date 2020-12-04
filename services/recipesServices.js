const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) =>
  recipesModel.createRecipe(name, ingredients, preparation, userId);

const listRecipes = async () => recipesModel.listRecipes();

const listRecipeById = async (id) => {
  const recipe = await recipesModel.listRecipeById(id);

  if (!recipe) {
    return { error: true, statusCode: 404, message: 'recipe not found' };
  }

  return recipe;
};

module.exports = {
  createRecipe,
  listRecipes,
  listRecipeById,
};
