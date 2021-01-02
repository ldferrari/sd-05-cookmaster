const { Router } = require('express');

const service = require('../service/recipesService');
const validateJWS = require('../auth/validateJWS');

const route = Router();

route.get('/', async (_req, res) => {
  const recipes = await service.getAll();
  return res.status(200).json(recipes);
});
route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await service.getById(id);
  if (recipe.error) {
    if (recipe.code === 'not_found') {
      return res.status(404).json({ message: recipe.message });
    }
  }
  res.status(200).json(recipe);
});
route.post('/', validateJWS, async (req, res, _next) => {
  const recipe = await service.create(req.body);
  if (recipe.error) {
    if (recipe.code === 'invalid_data') {
      return res.status(400).json({ message: recipe.message });
    }
  }
  res.status(201).json(recipe);
});
module.exports = route;
