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

recipes.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await service.getById(id);

  if (recipe.error) {
    return next(recipe);
  }

  res.status(200).json(recipe);
}));

module.exports = recipes;
