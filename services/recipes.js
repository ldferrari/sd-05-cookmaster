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

module.exports = {
  getById,
  editById,
};
