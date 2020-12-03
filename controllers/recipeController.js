const express = require('express');
const rescue = require('express-rescue');
const { getAllRecipes } = require('../models/recipeModel');
const { addRecipeServ } = require('../services/recipeService');
const validation = require('./validation');

const recipeRouter = express.Router();

recipeRouter.post(
  '/',
  validation,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    // console.log('recipe controler', name);
    const recipe = await addRecipeServ(name, ingredients, preparation);

    const { _id: id } = req.user;

    recipe.userId = id;
    console.log({ recipe });

    return res.status(201).json({ recipe });
  }),
);

recipeRouter.get(
  '/',
  rescue(async (req, res) => {
    const allRecipes = await getAllRecipes();

    res.status(200).json(allRecipes);
  }),
);

module.exports = recipeRouter;
