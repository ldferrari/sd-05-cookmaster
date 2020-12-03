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

const create = async (name, ingredients, preparation, userId) => {
  const validRecipe = await isRecipeValid(name, ingredients, preparation);
  if (!validRecipe) return false;
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return {
    recipe: newRecipe,
  };
};

const getById = async (id) => {
  const recipeById = await recipesModel.getById(id);
  if (!recipeById) {
    throw new CodeError('recipe not found', 'not_found');
  }
  return recipeById;
};

const updateById = async (id, name, ingredients, preparation, userId) => {
  const validRecipe = await isRecipeValid(id, name, ingredients, preparation);
  if (!validRecipe) return false;
  // if (!ObjectId.isValid(id)) {
  //   throw new CodeError('invalid_id', 'Wrong id format');
  // }
  // now is within model, better practice
  // const validToken = await isTokenValid(token);
  // if (!validToken) return false;
  // now is a middleware instead of a service function
  const updatedRecipe = await recipesModel.updateById(id, name, ingredients, preparation, userId);
  return updatedRecipe;
};

const deleteById = async (id) => {
  await recipesModel.deleteById(id);
  return true;
};

module.exports = { isRecipeValid, create, getById, updateById, deleteById };
