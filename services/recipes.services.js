const { RecipesModel } = require('../models');

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
  listAllRecipes: async (recId = null) => {
    const result = await RecipesModel.listAllRecipes(recId);
    return result;
  },
  listRecipeById: async (recId) => {
    const result = await RecipesModel.listRecipeById(recId);
    return result;
  },
  updateRecipe: async (id, name, ingredients, preparation) => {
    const updatedRecipe = await RecipesModel.updateRecipe(
      id,
      name,
      ingredients,
      preparation,
    );
    return updatedRecipe;
  },
  removeRecipe: async (id) => RecipesModel.removeRecipe(id),
  addImage: async (id) => RecipesModel.addImage(id),
};
