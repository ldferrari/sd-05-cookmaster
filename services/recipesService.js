const model = require('../models/recipesModel');

const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      code: 'not_found',
      message: 'recipe not found',
      error: true,
    };
  }
  return recipe;
};

const getAll = async () => model.getAll();

const create = async (recipe, user) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  return model.create(recipe, user);
};

module.exports = {
  create,
  getAll,
  getById,
};
