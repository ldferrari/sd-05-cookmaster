/* eslint-disable */
const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const { ObjectId } = require('mongodb');

const model = require('../models/recipes');
const modelUser = require('../models/users');

const getAll = async () => model.getAll();

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const item = await model.getById(id);
  if (!item) throw { err: { code: 'invalid_data', message: 'recipe not found' } };

  return item;
};

const create = async (name, email, password) => {
  if (!name && !email) {
    throw {
      err: {
        code: 'invalid_entries',
        message: 'Invalid entries. Try again',
      },
    };
  }
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!validEmail.test(email)) {
    throw {
      err: {
        code: 'invalid_entries',
        message: 'Invalid entries. Try again',
      },
    };
  }
  const allUsers = await getAll();
  if (allUsers.map((e) => e.email).includes(email)) {
    throw { err: { code: 'email_used', message: 'Email already registered' } };
  }

  return model.createUser(name, email, password, 'user');
};

const cadastro = async (name, ingredients, preparation, idUser) => {
  if (!name && !ingredients && !preparation) {
    throw {
      err: {
        code: 'invalid_entries',
        message: 'Invalid entries. Try again',
      },
    };
  }

  return model.createRecipe(name, ingredients, preparation, idUser);
};

const update = async (id, name, ingredients, preparation, userId) => {
  const recipe = await getRecipe(id);
  if (recipe.userId === userId) {
    return model.updateProduct(id, name, ingredients, preparation, userId);
  }
  const user = modelUser.getById(userId);
  if (user.role === 'admin') {
    return model.updateProduct(id, name, ingredients, preparation, recipe.userId);
  }
  throw { err: { code: 'not_ownwe', message: "You can't edit recipe" } };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const recipe = await model.getById(id);
  if (!recipe) throw { err: { code: 'invalid_data', message: 'Wrong id format' } };

  if (recipe.userId === userId) {
    return model.deleteProduct(id);
  }
  const user = modelUser.getById(userId);
  if (user.role === 'admin') {
    return model.deleteProduct(id);
  }
  throw { err: { code: 'not_ownwe', message: "You can't delete this recipe" } };
};

module.exports = { getAll, getRecipe, remove, update, create, cadastro };
