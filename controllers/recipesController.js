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

recipes.get('/', async (_req, res) => {
  const getAll = await recipesService.getAll();
  return res.status(200).json(getAll);
});

recipes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await recipesService.getById(id);
    if (getById.error) {
      return res.status(getById.statusCode).json({ message: getById.message });
    }
    res.status(200).json(getById);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipes.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;

    const atualizaReceita = await recipesService.update(id, name, ingredients, preparation, userId);
    if (atualizaReceita.error) {
      return res.status(atualizaReceita.statusCode).json({ message: atualizaReceita.message });
    }
    return res.status(200).json(atualizaReceita);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipes.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletaReceita = await recipesService.deleteRecipe(id);
    if (!auth) return res.status(401).json({ message: 'missing auth token' });
    res.status(204).json(deletaReceita);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = recipes;
