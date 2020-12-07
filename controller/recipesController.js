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
    if (newRecipe.err) {
      res.status(newRecipe.code).json({ message: newRecipe.message });
    }
    console.log(newRecipe);
    res.status(201).json({ recipe: newRecipe });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = recipes;
