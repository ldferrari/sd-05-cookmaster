const { Router } = require('express');
const multer = require('multer');
const rescue = require('express-rescue');

const service = require('../services/recipesService');
const auth = require('../middlewares/auth');

const recipes = Router();

const upload = multer({ storage: multer.memoryStorage() });

recipes.put('/:id/image', upload.single('image'), auth, rescue(async (req, res, _next) => {
  const { id } = req.params;
  const recipeWithImage = await service.updateImage(id, req.file);
  res.status(200).json(recipeWithImage);
}));

recipes.post('/', auth, rescue(async (req, res, next) => {
  const recipe = await service.create(req.body, req.user);
  if (recipe.error) {
    return next(recipe);
  }
  res.status(201).json({ recipe });
}));

recipes.put('/:id', auth, rescue(async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const recipe = await service.update(id, req.body, userId);
  if (recipe.error) {
    return next(recipe);
  }
  res.status(200).json(recipe);
}));

recipes.delete('/:id', auth, rescue(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.user;
  const isAdmin = await service.exclude(id, role);
  if (!isAdmin) {
    next(isAdmin);
  }
  res.status(204).json();
}));

recipes.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await service.getById(id);
  if (recipe.error) {
    return next(recipe);
  }
  res.status(200).json(recipe);
}));

recipes.get('/', rescue(async (req, res) => {
  const allRecipes = await service.getAll();
  res.status(200).json(allRecipes);
}));

module.exports = recipes;
