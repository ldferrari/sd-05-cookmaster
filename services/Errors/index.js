const IdNotFound = require('./IdNotFound');
const InvalidEntries = require('./InvalidEntries');
const EmailAlreadyExists = require('./EmailAlreadyExists');
const IncorrectEntries = require('./IncorrectEntries');
const RequiredFields = require('./RequiredFields');
const AuthorizationFailed = require('./AuthorizationFailed');
const RecipeNotFound = require('./RecipeNotFound');
const MissingToken = require('./MissingToken');

module.exports = {
  IdNotFound,
  InvalidEntries,
  EmailAlreadyExists,
  IncorrectEntries,
  RequiredFields,
  AuthorizationFailed,
  RecipeNotFound,
  MissingToken,
};
