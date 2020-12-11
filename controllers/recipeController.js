const rescue = require('express-rescue');
const { Router } = require('express');
const { hasToken, isRecipes } = require('../middlewares');
const { addNewRecipe, getAllRecipes, getById, update } = require('../models/ModelRecipes');

const recipeController = Router();

recipeController.post('/', isRecipes, hasToken, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.payloadWithoutPassword;

  const recipe = await addNewRecipe(name, ingredients, preparation, userId);
  if (!recipe) {
    return res.status(400).json({ message: 'Recipe was not Created' });
  }
  res.status(201).json({ recipe });
}));

recipeController.get('/', rescue(async (_req, res) => {
  const recipes = await getAllRecipes();
  return res.status(200).json(recipes);
}));

recipeController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await getById(id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipe);
}));

recipeController.put('/:id', hasToken, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await update(id, name, ingredients, preparation);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipe);
}));

module.exports = recipeController;
