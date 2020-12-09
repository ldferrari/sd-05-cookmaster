const { Router } = require('express');

const service = require('../Service/recipesService');

const auth = require('../Middlewares/auth');

const recipes = Router();

recipes.get('/', async (_req, res) => {
  const allRecipes = await service.getAll();
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
    res.status(500).json({ message: 'Algo de errado não está certo' });
  }
});

recipes.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    // if (!auth) return res.status(401).json({ message: 'missing auth token' });
    const updateRecipe = await service.update(id, name, ingredients, preparation, userId);
    if (updateRecipe.error) {
      return res.status(updateRecipe.statusCode).json({ message: updateRecipe.message });
    }
    return res.status(200).json(updateRecipe);
  } catch (error) {
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
    res.status(500).json({ message: 'Algo de errado não está certo' });
  }
});

recipes.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    // const recipe = await service.getById(id);
    const removeRecipe = await service.remove(id);
    if (!auth) return res.status(401).json({ message: 'missing auth token' });
    /* if (updateRecipe.error) {
      return res.status(updateRecipe.statusCode).json({ message: updateRecipe.message });
    } */
    res.status(204).json(removeRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Algo de errado não está certo' });
  }
});

module.exports = recipes;
