const { Router } = require('express');

const recipesRouter = Router();
// const rescue = require('express-rescue');

const recipesServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');
const { validateToken } = require('../middlewares');

// 3 - Crie um endpoint para o cadastro de receitas
recipesRouter.post('/', validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  // const token = req.headers.authorization;
  const userId = req.payload;
  try {
    const recipeCreated = await recipesServices.create(name, ingredients, preparation, userId);
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
recipesRouter.get('/', async (_req, res) => {
  try {
    const recipes = await recipesModel.getAll();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

// 5 - Crie um endpoint para visualizar uma receita específica
recipesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipeById = await recipesServices.getById(id);
    res.status(200).json(recipeById);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

// 7 - Crie um endpoint para a edição de uma receita
recipesRouter.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const userId = req.payload;
  try {
    const updatedRecipe = await recipesServices.updateById(
      id,
      name,
      ingredients,
      preparation,
      userId
    );
    if (!updatedRecipe) return res.status(400).json({ message: 'Recipe was not updated' });
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    if (err.code === 'unauthorized') {
      return res.status(401).json({ message: err.message });
    }
    if (err.code === 'wrong_auth') {
      return res.status(401).json({ message: err.message });
    }
    if (err.code === 'invalid_data') {
      return res.status(401).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedProduct = await prodService.deleteById(id);
//     return res.status(200).json(deletedProduct);
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(422).json({ err });
//     }
//     console.error(err);
//     res.status(500).json({ message: 'Erro interno aiaiai' });
//   }
// });

module.exports = recipesRouter;
