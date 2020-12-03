// const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const isRecipeValid = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_data');
  }
  return true;
};

const isTokenValid = async (token) => {
  try {
    if (!token) {
      throw new CodeError('jwt malformed', 'unauthorized');
    }
    const secret = 'secret-stuff-here-what?';
    const payload = await jwt.verify(token, secret);
    if (!token || !payload.exp * 1000 > Date.now()) {
      throw new CodeError('jwt malformed', 'unauthorized');
    }
    return true;
  } catch (err) {
    // console.error(err);
    throw new CodeError('jwt malformed', 'unauthorized');
  }
};
// https://stackoverflow.com/questions/51292406/jwt-check-if-token-expired

const create = async (name, ingredients, preparation, token) => {
  const validRecipe = await isRecipeValid(name, ingredients, preparation);
  if (!validRecipe) return false;
  const validToken = await isTokenValid(token);
  if (!validToken) return false;
  const secret = 'secret-stuff-here-what?';
  const payload = await jwt.verify(token, secret);
  const userId = payload.userData.id;
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return {
    recipe: newRecipe,
  };
  // now returns with correct userId yeepeee
};

module.exports = { isRecipeValid, create };
