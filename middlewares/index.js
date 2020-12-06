const validateUserSignUp = require('./validateUsersSignUp');
const validateUserLogin = require('./validateUserLogin');
const validateJWT = require('./validateJWT');
const emailValidation = require('./emailValidation');

module.exports = {
  validateUserSignUp,
  validateUserLogin,
  validateJWT,
  emailValidation,
};
