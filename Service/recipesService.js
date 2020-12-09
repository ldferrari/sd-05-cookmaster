// const { ObjectId } = require('mongodb');
const model = require('../Models/recipesModel');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'recipe not found',
      statusCode: 404,
    };
  }
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  /* if (!token) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'jwt malformed',
      statusCode: 401,
    };
  } */
  return model.create(name, ingredients, preparation, userId);
};

const update = async (id, name, ingredients, preparation, userId) => {
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Algo deu errado',
      statusCode: 401,
    };
  }
  return model.update(id, name, ingredients, preparation, userId);
};

const remove = async (id) => {
  const recipe = await model.exclude(id);
  if (!recipe) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Algo deu errado',
      statusCode: 500,
    };
  }
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
