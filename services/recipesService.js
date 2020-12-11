const recipesModel = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      statusCode: 400,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  return recipesModel.create(name, ingredients, preparation, userId);
};

const getAll = async () => recipesModel.getAll();

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);   
  if (!recipe) {
    return {
      error: true,
      statusCode: 404,
      code: 'invalid_data',
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
