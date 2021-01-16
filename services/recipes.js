const { ObjectId } = require('mongodb');
const models = require('../models');
const ThrowMyError = require('../middlewares/configError');

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new ThrowMyError('recipe not found', 'invalid_id');
  }

  const recipe = await models.recipes.getById(id);

  if (!recipe) {
    throw new ThrowMyError('recipe not found', 'invalid_id');
  }

  return recipe;
};

const editById = async (id, payload, userId) => {
  const recipe = await getById(id);

  if (!recipe) {
    throw new ThrowMyError('recipe not found', 'invalid_id');
  }

  return models.recipes.editById(id, payload, userId);
};

const removeById = async (id) => {
  await getById(id);

  await models.recipes.removeById(id);
};

const saveImage = async (id) => {
  const recipe = await getById(id);

  const recipeWithImg = await models.recipes.saveImage(id, recipe);

  return recipeWithImg;
};

module.exports = {
  getById,
  editById,
  removeById,
  saveImage,
};
