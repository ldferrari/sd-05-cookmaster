const recipesModel = require('../models/recipesModel');

const CodeError = require('../errorClass/errorClass');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CodeError(400, 'Invalid entries. Try again.');
  }
  return true;
};

const create = async (name, ingredients, preparation, userId) => recipesModel
  .create(name, ingredients, preparation, userId);

const getAllRecipes = async () => recipesModel.getAllRecipes();

module.exports = {
  create,
  validateRecipe,
  getAllRecipes,
};
