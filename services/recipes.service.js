const Joi = require('@hapi/joi');
const crudModel = require('../models/crud.model');
const {
  verifyToken,
} = require('../auth/token.auth');

const COLLECTION = 'recipes';

const REGISTER_SCHEMA = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const INVALID_DATA = {
  code: 'invalid_data',
  status: 400,
  message: 'Invalid entries. Try again.',
};

const registerRecipe = async (req, _res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const { error } = REGISTER_SCHEMA.validate({ name, ingredients, preparation });
    if (error) throw new Error('Invalid entries. Try again.');
    const { payload: { _id: userId } } = await verifyToken(authorization);
    const recipeData = await crudModel.createDocument(
      { name, ingredients, preparation },
      COLLECTION,
    );
    if (!recipeData) throw new Error('Invalid entries. Try again.');
    req.data = { userId, ...recipeData };
    next();
  } catch ({ message }) {
    console.error(message);
    if (message === 'jwt malformed') {
      next({ ...INVALID_DATA, message, status: 401 });
      return;
    }
    next({ ...INVALID_DATA, message });
  }
};

const listRecipes = async (req, _res, next) => {
  try {
    req.data = await crudModel.readDocument(null, COLLECTION);
    next();
  } catch (message) {
    next({ ...INVALID_DATA, message });
  }
};

module.exports = {
  registerRecipe,
  listRecipes,
};
