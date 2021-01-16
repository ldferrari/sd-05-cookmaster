const { Router } = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const validateJWT = require('../auth/validateJWT');
const models = require('../models');
const services = require('../services');

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

  return res.status(200).json(allRecipes);
}));

recipes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await services.recipes.getById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
}));

recipes.put('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { name, ingredients, preparation } = req.body;

  const payload = { name, ingredients, preparation };

  const recipe = await services.recipes.editById(id, payload, userId);

  return res.status(200).json(recipe);
}));

recipes.delete('/:id', validateJWT, rescue(async (req, res) => {
  const { id } = req.params;

  await services.recipes.removeById(id);

  return res.status(204).json({ message: 'deleted' });
}));

// Passo a passo para configurar o Multer e fazer upload do arquivo.
// https://app.betrybe.com/course/back-end/nodejs/multer/conteudo/show-me-the-code?use_case=next_button
// file.originalname pode ser usado p/ criar arquivo ou pasta com nome orignal do arquivo.
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    // Nome do arquivo criado com id da receita.
    const { id } = req.params;

    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipes.put('/:id/image', upload.single('image'), validateJWT, rescue(async (req, res) => {
  const { id } = req.params;

  const success = await services.recipes.saveImage(id);

  return res.status(200).json(success);
}));

module.exports = recipes;
