const { Router } = require('express');

const service = require('../Service/recipesService');

const recipes = Router();

recipes.post('/', async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const newRecipe = await service.create(name, ingredients, preparation, userId);
    // console.log(newRecipe)
    if (newRecipe.error) {
      return res.status(newRecipe.statusCode).json({ message: newRecipe.message });
    }
    res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Algo de errado não está certo' });
  }
});

module.exports = recipes;
