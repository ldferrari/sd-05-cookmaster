const models = require('../models/recipesModels');

const allRecipes = async () => models.getAllRecipes();

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = {
    name,
    ingredients,
    preparation,
    imgURL: "./url/img/no_do_arquivo.jpg",
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
};
