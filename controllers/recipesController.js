const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../services/recipesService');
const authToken = require('../middlewares/authToken');

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

recipes.put('/:id', authToken, rescue(async (req, res, next) => {
  const updatedRecipe = await service.update(req);

  if (updatedRecipe.error) {
    return next(updatedRecipe);
  }

  res.status(200).json(updatedRecipe);
}));

recipes.delete('/:id', authToken, rescue(async (req, res) => {
  const { id } = req.params;

  await service.remove(id);

  res.status(204).json();
}));

module.exports = recipes;
