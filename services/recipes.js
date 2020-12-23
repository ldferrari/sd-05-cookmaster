/* eslint-disable */

const { ObjectId } = require('mongodb');

const model = require('../models/recipes');
const modelUser = require('../models/users');

function errorGenerator(code, message) {
  const err = new Error();
  Object.assign(err, { code, message });
  return err;
}
export default errorGenerator;
const getAll = async () => model.getAll();

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw errorGenerator('invalid_data', 'Wrong id format');
  }
  const item = await model.getById(id);
  if (!item) {
    throw errorGenerator('invalid_data', 'recipe not found');
  }

  return item;
};

const create = async (name, email, password) => {
  if (!name && !email) {
    throw errorGenerator('invalid_entries', 'Invalid entries. Try again');
  }
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!validEmail.test(email)) {
    throw errorGenerator('invalid_entries', 'Invalid entries. Try again');
  }
  const allUsers = await getAll();
  if (allUsers.map((e) => e.email).includes(email)) {
    throw errorGenerator('email_used', 'Email already registered');
  }

  return model.createUser(name, email, password, 'user');
};

const cadastro = async (name, ingredients, preparation, email) => {
  if (!name || !ingredients || !preparation) {
    throw errorGenerator('invalid_entries', 'Invalid entries. Try again');
  }
  const { _id: idUser } = await modelUser.getByEmail(email);
  return model.createRecipe(name, ingredients, preparation, idUser);
};

const update = async (id, name, ingredients, preparation, userEmail) => {
  const recipe = await getRecipe(id);
  const user = await modelUser.getByEmail(userEmail);
  const { _id: userId } = user;
  if (recipe.userId.toString() === userId.toString()) {
    console.log('aqui');
    return model.updateRecipe(id, name, ingredients, preparation, userId.toString());
  }
  // const user = modelUser.getById(userId);
  if (user.role === 'admin') {
    return model.updateRecipe(id, name, ingredients, preparation, recipe.userId.toString());
  }
  throw errorGenerator('not_ownwe', `${''}You can't edit recipe`);
};

const remove = async (id, email) => {
  if (!ObjectId.isValid(id)) {
    throw errorGenerator('invalid_data', `${''}Wrong id format`);
  }
  const recipe = await model.getById(id);
  if (!recipe) throw errorGenerator('invalid_data', `${''}Wrong id format`);
  const user = await modelUser.getByEmail(email);
  const { _id: userId } = user;
  if (recipe.userId.toString() === userId.toString()) {
    return model.deleteRecipe(id);
  }

  if (user.role === 'admin') {
    return model.deleteRecipe(id);
  }
  throw errorGenerator('not_ownwe', `${''}You can't delete this recipe`);
};

module.exports = { getAll, getRecipe, remove, update, create, cadastro };
