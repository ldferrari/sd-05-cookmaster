const { Router } = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../auth/validateJWT');
const models = require('../models');

const recipes = Router();

recipes.post('/', validateJWT, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipe = await models.recipes.register(name, ingredients, preparation, userId);

  return res.status(201).json(recipe);
}));

recipes.get('/', rescue(async (_req, res) => {
  const allRecipes = await models.recipes.getAll();

  console.log('recipes', allRecipes);
  return res.status(200).json(allRecipes);
}));

module.exports = recipes;
