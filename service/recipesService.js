const model = require('../model/recipesModel');

const createRecipe = (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    // eslint-disable-next-line no-throw-literal
    throw { code: 400, message: 'Invalid entries. Try again.' };
  }
  return model.createRecipe(name, ingredients, preparation, userId);
};

module.exports = {
  createRecipe,
};
