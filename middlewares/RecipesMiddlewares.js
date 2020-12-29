const { ObjectId } = require('mongodb');
const { RecipesModel } = require('../models');
const ErrorsEnums = require('../enumerators/ErrorsEnums');

module.exports = {
  verifyRecipe: async (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
      return res.status(400).send(ErrorsEnums.invalidEntries);
    }
    next();
  },
  verifyRecipeId: async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send(ErrorsEnums.noRecipe);
    }
    next();
  },
  canRemove: async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    const { _id: userId, role } = user;
    const recipeToRemove = await RecipesModel.listRecipeById(id);
    if (!(userId !== recipeToRemove.userId) && !(role !== 'admin')) {
      return res.status(401).send({ message: 'not allowed' });
    }
    next();
  },
};
