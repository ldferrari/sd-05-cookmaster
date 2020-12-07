const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../services/recipeService');
const token = require('../middlewares/token');

const route = Router();

route.post('/', token, rescue(async (req, res, next) => {
  const recipe = await service.create(req.body);
  if (recipe.error) {
    return next(recipe);
  }
  res.status(201).json({ recipe });
}));

route.get('/', rescue(async (req, res) => {
  const allRecipes = await service.getAll();
  res.status(200).json(allRecipes);
}));

module.exports = route;
