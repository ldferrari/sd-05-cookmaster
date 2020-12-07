const rescue = require('express-rescue');
const services = require('../services/recipesServices');

const getAllRecipes = rescue(async (_req, res) => {
  // let user;
  const recipes = await services.allRecipes();
  // if (req.user) {
  //   user = req.user;
  // }
  res.status(200).json(recipes);
});

const createRecipe = rescue(async (req, res) => {
  const { user: { _id: userId } } = req;

  const { name, ingredients, preparation } = req.body;
  const recipe = await services.createRecipe(name, ingredients, preparation, userId);
  if (!recipe) {
    return res.status(400).json({ message: 'Invalid entries, Try again.' });
  }

  res.status(201).json(recipe);
});

module.exports = {
  getAllRecipes,
  createRecipe,
};
