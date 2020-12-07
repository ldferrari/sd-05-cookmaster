const Router = require('express');

const recipes = Router();

const tokenAuth = require('../middleware/tokenAuth');

const service = require('../service/recipesService');

recipes.post('/', tokenAuth, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;
  console.log(user);
  try {
    const newRecipe = await service.createRecipe(name, ingredients, preparation, user);
    console.log(newRecipe);
    res.status(201).json(newRecipe);
  } catch (e) {
    res.status(e.code).json({ message: e.message });
  }
});

module.exports = recipes;
