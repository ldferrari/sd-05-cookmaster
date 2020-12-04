const model = require('../models/recipesModel');

const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      code: 'not_found',
      message: 'recipe not found',
      error: true,
    };
  }
  return recipe;
};

const getAll = async () => model.getAll();

const create = async (recipe, user) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  return model.create(recipe, user);
};

const update = async (id, recipe, userId) => model.update(id, recipe, userId);

const exclude = async (id, role) => {
  if (role === 'admin') {
    model.exclude(id);
  } else {
    return { error: true, code: 'invalid_user', message: 'missing auth token' };
  }
};

const updateImage = async (id, image) => {
  const { mimetype } = image;
  const imageExtension = mimetype.split('/')[1];
  const imageURL = `localhost:3000/images/${id}.${imageExtension}`;
  return model.updateImage(id, imageURL);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
  updateImage,
};
