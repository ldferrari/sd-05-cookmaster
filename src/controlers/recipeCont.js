const { Router } = require('express');
const rescue = require('express-rescue');

const service = require('../services/recipeService');
const token = require('../middlewares/token');

const route = Router();

route.post('/', token, rescue(async (req, res, next) => {
  const recipe = await service.create(req.body, req.user);
  if (recipe.error) {
    return next(recipe);
  }
  res.status(201).json({ recipe });
}));

route.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await service.getById(id);
  if (recipe.error) {
    return next(recipe);
  }
  res.status(200).json(recipe);
}));

route.get('/', rescue(async (req, res) => {
  const all = await service.getAll();
  res.status(200).json(all);
}));

module.exports = route;
