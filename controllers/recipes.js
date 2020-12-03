const multer = require('multer');
const express = require('express');
const rescue = require('express-rescue');
const { validateRecipe, validateToken } = require('../middlewares/index');
const {
  addRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
} = require('../models');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callBack) => {
    const { id } = req.params;
    callBack(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipesController = express.Router();

const recipeNotFoundErr = { message: 'recipe not found' };

recipesController.post('/', validateRecipe, validateToken, rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await addRecipe({ name, ingredients, preparation, userId });
  return res.status(201).json({ recipe });
}));

recipesController.get('/', rescue(async (_, res) => {
  const recipes = await getAllRecipes();

  res.status(200).json(recipes);
}));

recipesController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipe(id);
  if (!recipe) return res.status(404).json(recipeNotFoundErr);

  res.status(200).json(recipe);
}));

recipesController.put('/:id/image/', validateToken, upload.single('image'), rescue(async (req, res) => {
  const { id } = req.params;

  const result = await addImage(id);

  res.status(200).json(result);
}));

recipesController.put('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;

  const result = await updateRecipe(id, req.body);

  if (result) {
    const updatedRecipe = await getRecipe(id);

    return res.status(200).json(updatedRecipe);
  }

  res.status(404).json(recipeNotFoundErr);
}));

recipesController.delete('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;

  await deleteRecipe(id);

  res.status(204).json(null);
}));

module.exports = recipesController;
