const { RecipesModel } = require('../models');

// const createRecipe = async (name, ingredients, preparation, userId) => {
//   const newRecipe = await RecipesModel.createRecipe(name, ingredients, preparation, userId);
//   return newRecipe;
// };

// const listRecipe = async () => {
//   const result = await RecipesModel.listRecipe();
//   return result;
// };

// module.exports = { createRecipe };
module.exports = {
  createRecipe: async (name, ingredients, preparation, userId) => {
    const newRecipe = await RecipesModel.createRecipe(
      name,
      ingredients,
      preparation,
      userId,
    );
    return newRecipe;
  },
  listRecipe: async () => {
    const result = await RecipesModel.listRecipe();
    return result;
  },
};
