const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const { ObjectId } = require('mongodb');
const {
  getAllRecipes,
  getRecipeById,
  update,
  exclude,
  updatedWithImage,
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

// multer

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

recipeRouter.put(
  '/:id/image',
  upload.single('image'),
  validation,
  rescue(async (req, res) => {
    const { id } = req.params;

    await updatedWithImage(id);

    const recipe = await getRecipeById(id);

    console.log('====================================');
    console.log({ recipe });
    console.log('====================================');

    return res.status(200).json(recipe);
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
