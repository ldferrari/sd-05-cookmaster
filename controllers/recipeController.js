const rescue = require('express-rescue');
const { Router } = require('express');
const { hasToken, isRecipes } = require('../middlewares');
const addNewRecipe = require('../models/ModelRecipes');

const recipeController = Router();

recipeController.post('/', hasToken, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await addNewRecipe(name, ingredients, preparation, userId);
  if (!newRecipe) {
    return res.status(400).json({ message: 'Recipe was not Created' });
  }
  res.status(201).json(newRecipe);
}));

module.exports = recipeController;
