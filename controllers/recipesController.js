const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../services/recipesService');
const auth = require('../middlewares/auth');

const recipes = Router();

recipes.post('/', auth, rescue(async (req, res, next) => {
  const recipe = await service.create(req.body);
  if (recipe.error) {
    return next(recipe);
  }
  res.status(201).json(recipe);
}));

module.exports = recipes;
