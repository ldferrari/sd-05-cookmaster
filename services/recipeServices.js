const { ObjectId } = require('mongodb');
// const jwt = require('jsonwebtoken');
const model = require('../models/recipeModel');
// const userModel = require('../models/userModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!ingredients || !preparation || !name) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }

  const newRecipe = await model.create(name, ingredients, preparation, userId);
  // console.log(newRecipe);
  return newRecipe;
};

const getAll = async () => {
  const recipes = await model.getAll();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  const recipe = await model.getById(id);

  if (!recipe) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  return recipe;
};

const update = async (name, ingredients, preparation, id, role, tokenId) => {
  if (!ingredients || !preparation || !name || !id || !role || !tokenId) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }

  if (!ObjectId.isValid(id)) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  const recipe = await model.getById(id);

  if (!recipe) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  // console.log(recipe.userId);

  if ((tokenId !== recipe.userId) && (role !== 'admin')) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  // console.log(role);
  await model.update(name, ingredients, preparation, id);
  const updated = { id, name, ingredients, preparation, userId: tokenId };
  // console.log(updated);
  return updated;
};

const exclude = async (id, role, tokenId) => {
  if (!id || !role || !tokenId) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  if (!ObjectId.isValid(id)) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  // console.log(recipe.userId);
  if ((tokenId !== recipe.userId) && (role !== 'admin')) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  const excluded = await model.exclude(id);
  // console.log(excluded);
  if (!excluded) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }
  console.log('one excluded');
  return excluded;
};

const uploadImage = async (id, tokenId, role) => {
  if (!ObjectId.isValid(id)) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  if ((tokenId !== recipe.userId) && (role !== 'admin')) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Invalid entries. Try again.',
    };
  }

  const uploadedImage = await model.uploadImage(id);

  if (!uploadedImage) {
    return {
      error: true,
      code: 'Not Found',
      message: 'recipe not found',
    };
  }
  return uploadedImage;
};

module.exports = {
  // login,
  getAll,
  getById,
  create,
  update,
  exclude,
  uploadImage,
};
