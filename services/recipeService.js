const recipeModel = require('../models/recipeModel');

class ErrorCode extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

async function validateRecipe(name, ingredients, preparation) {
  if (!name || !ingredients || !preparation) {
    throw new ErrorCode('Invalid entries. Try again.', 'invalid_data');
  }

  return true;
}

async function createRecipe(name, ingredients, preparation, userId) {
  const validRecipe = await validateRecipe(name, ingredients, preparation);
  if (!validRecipe) return false;

  const addRecipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  return { recipe: addRecipe };
}

async function getRecipeById(id) {
  const myRecipe = await recipeModel.getRecipeById(id);
  if (!myRecipe) throw new ErrorCode('recipe not found', 'not_found');
  return myRecipe;
}

async function updateRecipe(id, name, ingredients, preparation, userId) {
  const validRecipe = await validateRecipe(id, name, ingredients, preparation);
  if (!validRecipe) return false;

  const recipeUpdate = await recipeModel.updateRecipe(id, name, ingredients, preparation, userId);
  return recipeUpdate;
}

module.exports = { createRecipe, getRecipeById, updateRecipe };
