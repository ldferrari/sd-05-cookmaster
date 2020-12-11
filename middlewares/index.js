const searchUser = require('./searchUser');
const login = require('./login');
const hasToken = require('./hasToken');
const isRecipes = require('./isRecipes');
const isAdmin = require('./isAdmin');

module.exports = {
  login,
  isAdmin,
  hasToken,
  isRecipes,
  searchUser,
};
