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
module.exports = {
  create,
  getAll,
};
