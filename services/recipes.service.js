const { ObjectID } = require('mongodb');
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
      { userId, name, ingredients, preparation },
      COLLECTION,
    );
    if (!recipeData) throw new Error('Invalid entries. Try again.');
    req.data = recipeData;
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
    const { id } = req.params;
    if (id) req.data = await crudModel.readDocument({ _id: ObjectID(id) }, COLLECTION);
    else req.data = await crudModel.readDocument(null, COLLECTION);
    next();
  } catch {
    next({ ...INVALID_DATA, message: 'recipe not found', status: 404 });
  }
};

const updateRecipe = async (req, _res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id: recipeId } = req.params;
    const { authorization } = req.headers;

    if (!authorization) throw new Error('missing auth token');
    const { error } = REGISTER_SCHEMA.validate({ name, ingredients, preparation });
    if (error) throw new Error('Invalid entries. Try again.');
    const { payload: { _id, role } } = await verifyToken(authorization);
    const owner = await crudModel.readDocument({ _id: ObjectID(recipeId) }, COLLECTION);
    if (!owner) throw new Error('recipe not found');
    if (owner.userId !== _id && role !== 'admin') throw new Error('missing auth token');

    const result = await crudModel.updateDocument(
      { id: recipeId, name, ingredients, preparation },
      COLLECTION,
    );
    req.data = { ...result, userId: owner.userId };
    next();
  } catch ({ message }) {
    console.error(message);
    if (message === 'jwt malformed' || message === 'missing auth token') {
      next({ ...INVALID_DATA, message, status: 401 });
      return;
    }
    next({ ...INVALID_DATA, message });
  }
};

const deleteRecipe = async (req, _res, next) => {
  try {
    const { id: recipeId } = req.params;
    const { authorization } = req.headers;

    if (!authorization) throw new Error('missing auth token');
    const { payload: { _id, role } } = await verifyToken(authorization);
    const owner = await crudModel.readDocument({ _id: ObjectID(recipeId) }, COLLECTION);
    if (!owner) throw new Error('recipe not found');
    if (owner.userId !== _id && role !== 'admin') throw new Error('missing auth token');

    const result = await crudModel.deleteDocument({ id: recipeId }, COLLECTION);
    req.data = { ...result, userId: owner.userId };

    next();
  } catch ({ message }) {
    console.error(message);
    if (message === 'jwt malformed' || message === 'missing auth token') {
      next({ ...INVALID_DATA, message, status: 401 });
      return;
    }
    next({ ...INVALID_DATA, message });
  }
};

module.exports = {
  registerRecipe,
  listRecipes,
  updateRecipe,
  deleteRecipe,
};
