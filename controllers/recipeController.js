const { Router } = require('express');
const rescue = require('express-rescue');

const recipeRouter = Router();
const recipeService = require('../services/recipeService');
const jwtAuth = require('../middlewares/jwtAuth');

recipeRouter.post(
  '/',
  jwtAuth,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.userPayload;
    const newRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
    if (!newRecipe) return res.status(400).json({ message: 'Recipe was not created' });

    return res.status(201).json(newRecipe);
  }),
);

module.exports = recipeRouter;
