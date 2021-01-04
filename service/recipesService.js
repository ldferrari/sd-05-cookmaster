const model = require('../models/recipesModel');

const create = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  return model.create(recipe, userId);
};
const getAll = async () => {
  const recipes = await model.getAll();
  return recipes;
};
const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      error: true,
      code: 'not_found',
      message: 'recipe not found',
    };
  }
  return recipe;
};
const update = async (id, recipe, userID) => {
  // const recipeC = await model.getById(id);
  // if (recipeC) {
  const updatedRec = await model.update(id, recipe, userID);
  return updatedRec;
  // }
};

const deleteRecipe = async (id) => {
  const deleteRe = await model.deleteRecipe(id);
  return deleteRe;
};

const updateImg = async (id) => {
  const updateI = await model.updateImg(id);
  return updateI;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
  updateImg,
};
