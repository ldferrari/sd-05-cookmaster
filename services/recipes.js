const models = require('../models/index');
const Errors = require('./Errors/index');
const middlewares = require('../middlewares/index');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    throw new Errors.InvalidEntries();
  }
  return models.recipes.create(name, ingredients, preparation, userId);
};

module.exports = {
  createRecipe,
};
