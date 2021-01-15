const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const rm = require('../models/recipesModel');
const um = require('../models/usersModel');

const { recipesValidation, tokenOnly } = require('../services/recipeValidation');

const appRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

appRouter.post('/recipes', recipesValidation, rescue(async (req, res, _next) => {
  try {
    const { authorization } = req.headers;
    const { name, ingredients, preparation } = req.body;
    const decode = await jwt.verify(authorization, 'batata');
    const user = await um.findByEmail(decode.data.email);
    const recipe = await rm.createRecipe(name, ingredients, preparation, user.id);
    return res.status(201).json({ recipe });
  } catch (err) {
    console.log(err.message);
  }
}));

appRouter.get('/recipes', rescue(async (_req, res, _next) => {
  try {
    const allRecipes = await rm.getAllRecipes();
    return res.status(200).send(allRecipes);
  } catch (err) {
    console.log(err.message);
  }
}));

appRouter.get('/recipes/:id', rescue(async (req, res, _next) => {
  try {
    const { id } = req.params;
    const recipeId = await rm.recipeByIdSearch(id);
    if (recipeId === null) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    return res.status(200).json(recipeId);
  } catch (err) {
    console.log(err.message);
  }
}));

appRouter.put('/recipes/:id', recipesValidation, rescue(async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    await rm.editRecipe(id, name, ingredients, preparation);
    const upRecipe = await rm.recipeByIdSearch(id);
    return res.status(200).json(upRecipe);
  } catch (err) {
    console.log(err.message);
  }
}));

appRouter.delete('/recipes/:id', tokenOnly, rescue(async (req, res, _next) => {
  try {
    const { id } = req.params;
    rm.removeRecipe(id);
    return res.status(204).send();
  } catch (err) {
    return res.send(500).json(err.message);
  }
}));

appRouter.use(express.static(`${__dirname}/uploads`));

appRouter.put('/recipes/:id/image', tokenOnly, upload.single('image'), rescue(async (req, res) => {
  const { id } = req.params;
  await rm.addURLImage(id, `localhost:3000/images/${id}.jpeg`);
  const recipe = await rm.recipeByIdSearch(id);
  res.status(200).json(recipe);
}));

appRouter.use('/images', express.static('uploads'));

module.exports = appRouter;
