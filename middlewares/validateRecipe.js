const rescue = require('express-rescue');

const invalidErr = { message: 'Invalid entries. Try again.' };

const validateRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) return res.status(400).json(invalidErr);

  next();
});

module.exports = validateRecipe;
