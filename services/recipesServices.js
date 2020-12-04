const recipesModel = require('../models/recipesModel');

const CodeError = require('../errorClass/errorClass');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CodeError(400, 'Invalid entries. Try again.');
  }
  return true;
};

const create = async (name, ingredients, preparation, userId) => recipesModel
  .create(name, ingredients, preparation, userId);

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getById = async (id) => {
  if (id.length < 24) {
    throw new CodeError(404, 'recipe not found');
    // Deveria ser código 422 já que o formato do id é inválido, porém o teste valida como 404
  }
  const saida = await recipesModel.getById(id);
  if (!saida) {
    throw new CodeError(404, 'recipe not found');
  }
  return saida;
};

const update = async (id, name, ingredients, preparation, userId) => recipesModel
  .update(id, name, ingredients, preparation, userId);

const exclude = async (id) => recipesModel.exclude(id);

const updateWithImage = async (id, name, ingredients, preparation, userId, image) => recipesModel
  .updateWithImage(id, name, ingredients, preparation, userId, image);

module.exports = {
  create,
  validateRecipe,
  getAllRecipes,
  getById,
  update,
  exclude,
  updateWithImage,
};
