const { Router } = require('express');
const { newRecipeService, getAllRecipesService, getOneRecipeService } = require('../service').recipes;
const hasToken = require('../middleware/hasToken');

const route = Router();

route.post('/', hasToken, async (req, res) => {
  let userId = null;
  if (req.user.data) {
    const { user: { data: { _id: id } } } = req;
    userId = id;
  }
  const { name, ingredients, preparation } = req.body;
  const result = await newRecipeService(name, ingredients, preparation, null, userId);

  if (result.message) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
});

route.get('/', async (req, res) => {
  const result = await getAllRecipesService();
  return res.status(200).json(result);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getOneRecipeService(id);
  if (result.message) {
    return res.status(404).json(result);
  }

  return res.status(200).json(result);
});

module.exports = route;
