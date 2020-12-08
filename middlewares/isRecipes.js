const rescue = require('express-rescue');

const entriesErrors = { message: 'Invalid entries. Try again.' };

const isRecipes = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json(entriesErrors);
  }

  return next();
});

module.exports = isRecipes;
