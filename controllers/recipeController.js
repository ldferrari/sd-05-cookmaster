const express = require('express');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');
const {
  getAllRecipes,
  getRecipeById,
  update,
  exclude,
} = require('../models/recipeModel');
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
    // console.log({ recipe });

    return res.status(201).json({ recipe });
  }),
);

recipeRouter.put(
  '/:id',
  validation,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id: recipeid } = req.params;
    const { _id: id } = req.user;

    await update(recipeid, name, ingredients, preparation);

    return res.status(200).json({
      _id: recipeid,
      name,
      ingredients,
      preparation,
      userId: id,
    });
  }),
);
recipeRouter.delete(
  '/:id',
  validation,
  rescue(async (req, res) => {
    const { id } = req.params;

    await exclude(id);

    return res.status(204).end();
  }),
);

recipeRouter.get(
  '/',
  rescue(async (req, res) => {
    const allRecipes = await getAllRecipes();

    res.status(200).json(allRecipes);
  }),
);

recipeRouter.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    const recipe = await getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  }),
);

module.exports = recipeRouter;
