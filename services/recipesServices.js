// const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const isRecipeValid = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_data');
  }
  return true;
};

const create = async (name, ingredients, preparation) => {
  // const userId = get it how?
  // Neste endpoint temos apenas a info do token - permite achar user?
  const validRecipe = await isRecipeValid(name, ingredients, preparation);
  // passar param userId para que model possa retorna-lo tb
  if (!validRecipe) return false;
  const newRecipe = await recipesModel.create(name, ingredients, preparation);
  return {
    recipe: newRecipe,
  };
};

module.exports = { isRecipeValid, create };
