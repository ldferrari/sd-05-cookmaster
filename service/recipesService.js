const model = require('../models/recipesModel');

const create = async (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  return model.create(recipe);
};
const getAll = async () => {
  const recipes = await model.getAll();
  return recipes;
};
const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      error: true,
      code: 'not_found',
      message: 'recipe not found',
    };
  }
  return recipe;
};
module.exports = {
  create,
  getAll,
  getById,
};
