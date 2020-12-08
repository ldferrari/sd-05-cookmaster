const model = require('../Models/recipesModel');

// const usersModel = require('../Models/usersModel');

const create = async (name, ingredients, preparation, userId) => {
  // const { token } = authMiddleware;
  // const { _id } = authMiddleware.user;
  if (!name || !ingredients || !preparation) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  /* if (!token) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'jwt malformed',
      statusCode: 401,
    };
  } */
  return model.create(name, ingredients, preparation, userId);
};

module.exports = {
  create,
};
