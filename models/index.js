const connection = require('./connection');
const { findEmail, addUser } = require('./users');
const createToken = require('./token');
const { addRecipe, getAllRecipes, getRecipe } = require('./recipes');

module.exports = {
  connection,
  findEmail,
  createToken,
  addUser,
  addRecipe,
  getAllRecipes,
  getRecipe,
};
