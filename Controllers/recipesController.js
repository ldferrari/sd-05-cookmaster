const { Router } = require('express');

const service = require('../Service/recipesService');

const auth = require('../Middlewares/auth');

const recipes = Router();

recipes.get('/', async (_req, res) => {
  // const { token } = auth;
  const allRecipes = await service.getAll();
  // if (token || !token) 
  return res.status(200).json(allRecipes);
});

recipes.post('/', auth, async (req, res) => {
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

recipes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await service.getById(id);
    if (recipe.error) {
      return res.status(recipe.statusCode).json({ message: recipe.message });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Algo de errado não está certo' });
  }
});

module.exports = recipes;
