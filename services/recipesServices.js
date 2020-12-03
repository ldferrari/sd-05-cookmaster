// const { ObjectId } = require('mongodb');
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

// const isTokenValid = async (token, payload) => {
//   const smth = payload.exp;
//   if (!token || !smth) {
//     throw new CodeError('jwt malformed', 'unauthorized');
//   }
//   return true;
// };

const create = async (name, ingredients, preparation, token, payload) => {
  const validRecipe = await isRecipeValid(name, ingredients, preparation);
  if (!validRecipe) return false;
  // const validToken = await isTokenValid(token, payload);
  // if (!validToken) return false;
  const userId = payload.userData._id;
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return {
    recipe: newRecipe,
  };
  // now returns with correct userId yeepeee
};

module.exports = { isRecipeValid, create };
