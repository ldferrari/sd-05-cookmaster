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

const cadastro = async (name, ingredients, preparation, email) => {
  if (!name || !ingredients || !preparation) {
    throw {
      err: {
        code: 'invalid_entries',
        message: 'Invalid entries. Try again',
      },
    };
  }
  const { _id: idUser } = await modelUser.getByEmail(email);
  return model.createRecipe(name, ingredients, preparation, idUser);
};

const update = async (id, name, ingredients, preparation, userEmail) => {
  const recipe = await getRecipe(id);
  const user = await modelUser.getByEmail(userEmail);

  if (recipe.userId.toString() === user['_id'].toString()) {
    console.log('aqui');
    return model.updateRecipe(id, name, ingredients, preparation, user['_id'].toString());
  }
  // const user = modelUser.getById(userId);
  if (user.role === 'admin') {
    return model.updateRecipe(id, name, ingredients, preparation, recipe.userId.toString());
  }
  throw { err: { code: 'not_ownwe', message: "You can't edit recipe" } };
};

const remove = async (id, email) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const recipe = await model.getById(id);
  if (!recipe) throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  console.log('---------');
  const user = await modelUser.getByEmail(email);
  console.log(recipe, user);
  console.log(recipe.userId);
  console.log(recipe.userId.toString() === user['_id'].toString());
  if (recipe.userId.toString() === user['_id'].toString()) {
    return model.deleteRecipe(id);
  }

  if (user.role === 'admin') {
    return model.deleteRecipe(id);
  }
  throw { err: { code: 'not_ownwe', message: "You can't delete this recipe" } };
};

module.exports = { getAll, getRecipe, remove, update, create, cadastro };
