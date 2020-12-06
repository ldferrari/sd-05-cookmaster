const { Router } = require('express');
const {
  listRecipes,
  registerRecipe,
} = require('../services/recipes.service');

const users = Router();

users.get('/', listRecipes, (req, res) => {
  res.status(200).json(req.data);
});

users.post('/', registerRecipe, (req, res) => {
  res.status(201).json({ recipe: req.data });
});

module.exports = users;
