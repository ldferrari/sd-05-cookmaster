const model = require('../model/recipesModel');

const createRecipe = (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { err: true, code: 400, message: 'Invalid entries. Try again.' };
  }
  return model.createRecipe(name, ingredients, preparation, userId);
};

const getAll = () => model.getAll();

const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe) {
    return { err: true, code: 404, message: 'recipe not found' };
  }
  return recipe;
};

const updateRecipe = async (name, ingredients, preparation, recipeID, userID) => {
  // const recipe = await model.getById(recipeID);
  // if (!recipe) {
  //   return { err: true, code: 404, message: 'recipe not found' };
  // }
  const updatedRecipe = await model.updateRecipe(recipeID, name, ingredients, preparation, userID);
  return updatedRecipe;
};

const deleteRecipe = async (id) => model.deleteRecipe(id);

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
};
