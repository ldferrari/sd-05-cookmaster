const recipesModels = require('../models/recipesModels');

const createRecipe = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;

  if (!name || !ingredients || !preparation) {
    return {
      err: true,
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  return recipesModels.createRecipe(name, ingredients, preparation, userId);
};

module.exports = {
  createRecipe,
};
