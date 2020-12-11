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

module.exports = {
  create,
};
