const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../services/recipesService');

const recipes = Router();

recipes.post('/', rescue(async (req, res, next) => {
  const createdRecipe = await service.createRecipe(req);

  if (createdRecipe.error) {
    return next(createdRecipe);
  }

  res.status(201).json({ recipe: createdRecipe });
}));

recipes.get('/', rescue(async (_req, res) => {
  const allRecipes = await service.getAll();

  res.status(200).json(allRecipes);
}));

module.exports = recipes;
