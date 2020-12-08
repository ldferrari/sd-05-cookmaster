const models = require('../models/recipesModels');

const allRecipes = async () => models.getAllRecipes();

const getRecipeById = async (id) => {
  const recipe = await models.getRecipeById(id);
  if (!recipe) {
    return { message: 'recipe not found' };
  }
  return recipe;
};

const excludeRecipe = async (id) => {
  const recipeExists = await models.getRecipeById(id);
  if (!recipeExists) {
    return { message: 'Receita não encontrada' };
  }
  await models.exclude(id);
  return recipeExists;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = {
    name,
    ingredients,
    preparation,
    imgURL: './url/img/no_do_arquivo.jpg',
    userId,
  };
  const saveRecipe = await models.createRecipe(recipe);
  if (!saveRecipe) {
    return { message: 'Invalid entries. Try again' };
  }
  return saveRecipe;
};

module.exports = {
  allRecipes,
  createRecipe,
  getRecipeById,
  excludeRecipe,
};
