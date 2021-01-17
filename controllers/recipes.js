const express = require('express');
const rescue = require('express-rescue');
const { verifyNewRecipe } = require('../services/recipes');
const { verifyToken } = require('../services/token');
const { createRecipe, getAllRecipes } = require('../models/recipes');

const recipesController = express.Router();

// 3 - Crie um endpoint para o cadastro de receitas
recipesController.post('/', verifyNewRecipe, verifyToken, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  console.log(req);
  const { _id: userId } = req.user;

  const recipe = await createRecipe({ name, ingredients, preparation, userId });

  return res.status(201).json({ recipe });
}));

// 4 - Crie um endpoint para a listagem de receitas.
recipesController.get('/', rescue(async (_, res) => {
  const recipes = await getAllRecipes();

  res.status(200).json(recipes);
}));

module.exports = recipesController;
