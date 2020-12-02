const express = require('express');
const rescue = require('express-rescue');
const { validateRecipe, validateToken } = require('../middlewares/index');
const { addRecipe, getAllRecipes } = require('../models');

const recipesController = express.Router();

recipesController.post('/', validateRecipe, validateToken, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await addRecipe({ name, ingredients, preparation, userId });
  res.status(201).json({ recipe });
}));

recipesController.get('/', rescue(async (req, res) => {
  const recipes = await getAllRecipes();

  res.status(200).json(recipes);
}));

module.exports = recipesController;
