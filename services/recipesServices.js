const model = require('../models');

// https://bit.ly/2VxAplp
class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const create = async (name, ingredients, preparation) => {
  const thisRecipeExists = await model.recipes.findByName(name);

  if (thisRecipeExists) {
    throw new CodeError('Recipe already registered', 'invalid_entry');
  }

  // prettier-ignore
  if (
    !name
    || name === ''
    || !ingredients
    || ingredients === ''
    || !preparation
    || preparation === ''
  ) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_data');
  }

  const createdRecipe = await model.recipes.create(name, ingredients, preparation);
  return createdRecipe;
};

const getAll = async () => {
  const listAllRecipes = await model.recipes.getAll();

  return listAllRecipes;
};

const getById = async (id) => {
  const getRecipeById = await model.recipes.getById(id);

  if (!getRecipeById) {
    throw new CodeError('recipe not found', 'invalid_id');
  }

  return getRecipeById;
};

const updateById = async (id, name, ingredients, preparation, userId) => {
  const updatedRecipe = await model.recipes.updateById(id, name, ingredients, preparation, userId);
  console.log('Updated recipe: \n', updatedRecipe);
  return updatedRecipe;
};

const removeById = async (id) => {
  const removedRecipe = await model.recipes.removeById(id);
  return removedRecipe;
};

module.exports = {
  create,
  getAll,
  getById,
  removeById,
  updateById,
};
