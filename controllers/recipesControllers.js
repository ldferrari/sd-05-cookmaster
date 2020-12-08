const rescue = require('express-rescue');
const services = require('../services/recipesServices');

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await services.allRecipes();
  res.status(200).json(recipes);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await services.getRecipeById(id);
  // console.log(recipe);
  if (recipe.message) {
    res.status(404).json(recipe);
  }
  return res.status(200).json(recipe);
});

const createRecipe = rescue(async (req, res) => {
  const { user: { _id: userId } } = req;

  const { name, ingredients, preparation } = req.body;
  const recipe = await services.createRecipe(name, ingredients, preparation, userId);
  if (!recipe) {
    return res.status(400).json({ message: 'Invalid entries, Try again.' });
  }

  res.status(201).json({ recipe });
});

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
};
