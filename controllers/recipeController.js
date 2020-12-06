const { Router } = require('express');
const rescue = require('express-rescue');

const recipeRouter = Router();
const recipeModel = require('../models/recipeModel');
const recipeService = require('../services/recipeService');
const jwtAuth = require('../middlewares/jwtAuth');

recipeRouter.post(
  '/',
  jwtAuth,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.userPayload;
    const newRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
    return !newRecipe
      ? res.status(400).json({ message: 'Recipe was not created' })
      : res.status(201).json(newRecipe);
  }),
);

recipeRouter.get(
  '/',
  rescue(async (_req, res) => {
    const allRecipes = await recipeModel.getAllRecipes();
    res.status(200).json(allRecipes);
  }),
);

recipeRouter.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const myRecipe = await recipeService.getRecipeById(id);
    res.status(200).json(myRecipe);
  }),
);

module.exports = recipeRouter;
