const { ObjectId } = require('mongodb');
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
};
