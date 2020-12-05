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

const updateRecipe = async (name, ingredients, preparation, recipeId) => {
  // const checkRecipe = await listRecipeById(recipeId);
  // if (checkRecipe.userId !== userId) return null;

  const updatedRecipe = await recipesModel.updateRecipe(name, ingredients, preparation, recipeId);
  return updatedRecipe;
};

const deleteRecipe = async (recipeId) => recipesModel.deleteRecipe(recipeId);

module.exports = {
  createRecipe,
  listRecipes,
  listRecipeById,
  updateRecipe,
  deleteRecipe,
};
