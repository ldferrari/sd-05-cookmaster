const models = require('../models/index');
const Errors = require('./Errors/index');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    throw new Errors.InvalidEntries();
  }
  return models.recipes.create(name, ingredients, preparation, userId);
};

const listRecipes = async () => models.recipes.getAll();

const showRecipe = async (id) => {
  const recipe = await models.recipes.getById(id);
  console.log(recipe);
  switch (true) {
    case !recipe:
      throw new Errors.RecipeNotFound();
    default:
      return recipe;
  }
};

module.exports = {
  createRecipe,
  listRecipes,
  showRecipe,
};
