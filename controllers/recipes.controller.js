const { Router } = require('express');
const {
  listRecipes,
  updateRecipe,
  registerRecipe,
  deleteRecipe,
} = require('../services/recipes.service');

const users = Router();

users.get('/', listRecipes, (req, res) => {
  res.status(200).json(req.data);
});

users.get('/:id', listRecipes, (req, res) => {
  res.status(200).json(req.data);
});

users.post('/', registerRecipe, (req, res) => {
  res.status(201).json({ recipe: req.data });
});

users.put('/:id', updateRecipe, (req, res) => {
  res.status(200).json(req.data);
});

users.delete('/:id', deleteRecipe, (req, res) => {
  res.status(204).json(req.data);
});

module.exports = users;
