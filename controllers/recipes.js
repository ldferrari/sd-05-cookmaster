const express = require('express');
const rescue = require('express-rescue');
const { validateRecipe, validateToken } = require('../middlewares/index');
const { addRecipe, getAllRecipes, getRecipe } = require('../models');

const recipesController = express.Router();

recipesController.post('/', validateRecipe, validateToken, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await addRecipe({ name, ingredients, preparation, userId });
  res.status(201).json({ recipe });
}));

recipesController.get('/', rescue(async (_, res) => {
  const recipes = await getAllRecipes();

  res.status(200).json(recipes);
}));

recipesController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipe(id);
  console.log(recipe);
  if (!recipe) res.status(404).json({ message: 'recipe not found' });

  res.status(200).json(recipe);
}));

module.exports = recipesController;
