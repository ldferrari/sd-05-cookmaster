const { addRecipe } = require('../models/recipeModel');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const addRecipeServ = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CodeError('Invalid entries. Try again.', 'invalid_entries');
  }

  return addRecipe(name, ingredients, preparation);
};

module.exports = { addRecipeServ };
