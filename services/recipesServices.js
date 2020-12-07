const model = require('../models');

// https://bit.ly/2VxAplp
class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// const checkEmail = (mail) => mail.match(/\S+@\S+\.\S+/);

const create = async (name, ingredients, preparation) => {
  // const thisRecipeExists = await model.users.findByName(name);

  // if (thisEmailExists) {
  //   throw new CodeError('Email already registered', 'invalid_email');
  // }

  // prettier-ignore
  if (
    !name
    || name === ''
    || !ingredients
    || ingredients === ''
    || !preparation
    || preparation === ''
    // || !token
  ) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_data');
  }

  const createdRecipe = await model.recipes.create(name, ingredients, preparation);
  return createdRecipe;
};

// const login = async (email, password) => {
//   if (!password || password === '' || !email || email === '') {
//     throw new CodeError('All fields must be filled', 'invalid_data');
//   }

// const verifyPassword = await model.users.checkPassword(email, password);
//   const verifyUser = await model.users.findByEmail(email);
//   console.log(verifyUser);
//   if (!verifyUser || verifyUser.password !== password) {
//     throw new CodeError('Incorrect username or password', 'incorrect_data');
//   }

//   return verifyUser;
// };

module.exports = {
  create,
};
