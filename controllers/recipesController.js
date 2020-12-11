const { Router } = require('express');

const recipes = Router();

const recipesService = require('../services/recipesService');

const auth = require('../middlewares/auth');

recipes.post('/', auth, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const cadastraReceita = await recipesService.create(name, ingredients, preparation, userId);

    if (cadastraReceita.error) {
      return res.status(cadastraReceita.statusCode).json({ message: cadastraReceita.message });
    }
    res.status(201).json({ recipe: cadastraReceita });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = recipes;
