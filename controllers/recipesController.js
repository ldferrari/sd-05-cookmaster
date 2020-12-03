const { Router } = require('express');

const recipesRouter = Router();
// const rescue = require('express-rescue');

const recipesServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');

// 3 - Crie um endpoint para o cadastro de receitas
recipesRouter.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  try {
    const recipeCreated = await recipesServices.create(name, ingredients, preparation, token);
    if (!recipeCreated) return res.status(400).json({ message: 'Recipe was not created' });
    return res.status(201).json(recipeCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(400).json({ message: err.message });
    }
    if (err.code === 'unauthorized') {
      return res.status(401).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

// 4 - Crie um endpoint para a listagem de receitas
// Sem discriminar se a pessoa está identificada ou não
recipesRouter.get('/', async (req, res) => {
  try {
    const recipes = await recipesModel.getAll();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

module.exports = recipesRouter;
