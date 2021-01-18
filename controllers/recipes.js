const express = require('express');
const rescue = require('express-rescue');
const { verifyNewRecipe } = require('../services/recipes');
const { verifyToken } = require('../services/token');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} = require('../models/recipes');

const recipesController = express.Router();

// 3 - Crie um endpoint para o cadastro de receitas
recipesController.post(
  '/',
  verifyNewRecipe,
  verifyToken,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;

    const recipe = await createRecipe({
      name,
      ingredients,
      preparation,
      userId,
    });

    return res.status(201).json({ recipe });
  }),
);

// 4 - Crie um endpoint para a listagem de receitas.
recipesController.get(
  '/',
  rescue(async (_, res) => {
    const recipes = await getAllRecipes();

    res.status(200).json(recipes);
  }),
);

// 5 - Crie um endpoint para visualizar uma receita específica
recipesController.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  }),
);

// 7 - Crie um endpoint para a edição de uma receita.
recipesController.put(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const { name, ingredients, preparation } = req.body;

    const payload = { name, ingredients, preparation };
    const recipe = await updateRecipe(id, payload, userId);

    if (recipe) {
      const updatedRecipe = await getRecipeById(id);
      res.status(200).json(updatedRecipe);
    }

    return res.status(404).json({ message: 'recipe not found' });
  }),
);

module.exports = recipesController;
