const Router = require('express');

const recipes = Router();

const tokenAuth = require('../middleware/tokenAuth');

const service = require('../service/recipesService');

recipes.post('/', tokenAuth, (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  try {
    const newRecipe = service.createRecipe(name, ingredients, preparation, user);
    res.status(201).json(newRecipe);
  } catch (e) {
    res.status(e.code).json({ message: e.message });
  }
});

module.exports = recipes;
