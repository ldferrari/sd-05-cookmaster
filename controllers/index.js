const users = require('./usersController');
const login = require('./loginController');
const recipes = require('./recipesController');

module.exports = {
  login,
  users,
  recipes,
};
