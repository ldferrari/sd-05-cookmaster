const jwt = require('jsonwebtoken');
const recipeModel = require('../models/recipesModel');

const secret = 'senhaSecreta';

const createRecipe = async (req) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  if (!name || !ingredients || !preparation) {
    return { error: true, message: 'Invalid entries. Try again.' };
  }

  if (!token) {
    return { error: true, message: 'jwt malformed' };
  }

  try {
    const payload = jwt.verify(token, secret);

    if (typeof payload === 'string') {
      return { error: true, message: 'jwt malformed' };
    }

    return recipeModel.createRecipe(req.body, payload.sub);
  } catch (err) {
    return { error: true, message: 'jwt malformed' };
  }
};

const getAll = async () => recipeModel.getAll();

module.exports = {
  createRecipe,
  getAll,
};
