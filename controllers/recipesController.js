const { Router } = require('express');

const recipesRouter = Router();
// const rescue = require('express-rescue');

const recipesServices = require('../services/recipesServices');

// 3 - Crie um endpoint para o cadastro de receitas
recipesRouter.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    // tem que ter segunda validaçao do token existente porém invalido, regex?
    const recipeCreated = await recipesServices.create(name, ingredients, preparation);
    if (!recipeCreated) return res.status(400).json({ message: 'Recipe was not created' });
    return res.status(201).json(recipeCreated);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

module.exports = recipesRouter;
