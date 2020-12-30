const { ObjectId } = require('mongodb');
const errorGenerator = require('../errorGenerator');

const model = require('../models/recipes');
const modelUser = require('../models/users');

const getAll = async () => model.getAll();

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw errorGenerator('invalid_data', 'recipe not found');
  }
  const item = await model.getById(id);
  if (!item) {
    throw errorGenerator('invalid_data', 'recipe not found');
  }

  return item;
};

const cadastro = async (name, ingredients, preparation, email) => {
  if (!name || !ingredients || !preparation) {
    throw errorGenerator('invalid_entries', 'Invalid entries. Try again.');
  }
  const userData = await modelUser.getByEmail(email);
  if (!userData) {
    throw errorGenerator('invalid_user', 'You are trying to use a invalid user.');
  }
  const { _id: idUser } = userData;
  return { recipe: await model.createRecipe(name, ingredients, preparation, idUser) };
};

const update = async (id, name, ingredients, preparation, userEmail) => {
  const recipe = await getRecipe(id);
  const user = await modelUser.getByEmail(userEmail);
  const { _id: userId } = user;
  if (recipe.userId.toString() === userId.toString()) {
    return model.updateRecipe(id, name, ingredients, preparation, userId.toString());
  }
  if (user.role === 'admin') {
    return model.updateRecipe(id, name, ingredients, preparation, recipe.userId.toString());
  }
  throw errorGenerator('not_ownwe', `${''}You can't edit recipe`);
};

const updateImage = async (id, userEmail, file) => {
  const recipe = await getRecipe(id);
  const user = await modelUser.getByEmail(userEmail);
  const { _id: userId } = user;
  if (recipe.userId.toString() === userId.toString() || user.role === 'admin') {
    await model.updateRecipePhoto(id, file);
    return { ...recipe, image: file };
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

module.exports = { getAll, getRecipe, remove, update, cadastro, updateImage };
