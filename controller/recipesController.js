const Router = require('express');

const recipes = Router();

const tokenAuth = require('../middleware/tokenAuth');

const service = require('../service/recipesService');

recipes.post('/', tokenAuth, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userID } = req;
  console.log(userID);
  try {
    const newRecipe = await service.createRecipe(name, ingredients, preparation, userID);
    if (newRecipe.err) {
      return res.status(newRecipe.code).json({ message: newRecipe.message });
    }
    console.log(newRecipe);
    return res.status(201).json({ recipe: newRecipe });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

recipes.get('/', async (_req, res) => {
  try {
    const allRecipes = await service.getAll();
    return res.status(200).json(allRecipes);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
});

recipes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipeFound = await service.getById(id);
    if (recipeFound.err) {
      return res.status(recipeFound.code).json({ message: recipeFound.message });
    }
    return res.status(200).json(recipeFound);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
});

recipes.put('/:id', tokenAuth, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  console.log(id);
  const { userID } = req;
  try {
    const updatedRecipe = await service.updateRecipe(
      name, ingredients, preparation, id, userID,
    );
    // if (updatedRecipe.err) {
    //   return res.status(updatedRecipe.code).json({ message: updatedRecipe.message });
    // }
    return res.status(200).json(updatedRecipe);
  } catch (e) {
    return res.status(500).json(e);
  }
});

recipes.delete('/:id', tokenAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await service.deleteRecipe(id);
    return res.send(204);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

module.exports = recipes;
