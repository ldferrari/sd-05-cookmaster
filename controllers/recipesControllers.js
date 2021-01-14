const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const rm = require('../models/recipesModel');
const um = require('../models/usersModel');

const { recipesValidation } = require('../services/recipeValidation');

const appRouter = express.Router();

appRouter.post('/recipes', recipesValidation, rescue(async (req, res, _next) => {
  const { authorization } = req.headers;
  const { name, ingredients, preparation } = req.body;
  const decode = await jwt.verify(authorization, 'batata');
  const user = await um.findByEmail(decode.data.email);
  const recipe = await rm.createRecipe(name, ingredients, preparation, user.id);
  return res.status(201).json({ recipe });
}));

appRouter.get('/recipes', rescue(async (req, res, _next) => {
  const allRecipes = await rm.getAllRecipes();
  console.log(allRecipes);
  res.status(200).send(allRecipes);
}));
module.exports = appRouter;
