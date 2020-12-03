const { Router } = require('express');

const recipesRouter = Router();
const rescue = require('express-rescue');

const recipesServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');
const { validateToken } = require('../middlewares');

// 3 - Crie um endpoint para o cadastro de receitas
recipesRouter.post(
  '/',
  validateToken,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.userPayload;
    // So as not to write payload.userData._id in validateToken
    // because eslint does not let it pass
    const recipeCreated = await recipesServices.create(name, ingredients, preparation, userId);
    if (!recipeCreated) return res.status(400).json({ message: 'Recipe was not created' });
    return res.status(201).json(recipeCreated);
  })
);

// 4 - Crie um endpoint para a listagem de receitas
// Sem discriminar se a pessoa está identificada ou não
recipesRouter.get(
  '/',
  rescue(async (_req, res) => {
    const recipes = await recipesModel.getAll();
    res.status(200).json(recipes);
  })
);

// 5 - Crie um endpoint para visualizar uma receita específica
recipesRouter.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipeById = await recipesServices.getById(id);
    res.status(200).json(recipeById);
  })
);

// 7 - Crie um endpoint para a edição de uma receita
recipesRouter.put(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.userPayload;
    const updatedRecipe = await recipesServices.updateById(
      id,
      name,
      ingredients,
      preparation,
      userId
    );
    // if (!updatedRecipe) return res.status(400).json({ message: 'Recipe was not updated' });
    return res.status(200).json(updatedRecipe);
  })
);

// 8 - Crie um endpoint para a exclusão de uma receita
recipesRouter.delete(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const deletedRecipe = await recipesServices.deleteById(id);
    // if (!deletedRecipe) return res.status(400).json({ message: 'Recipe was not deleted' });
    return res.status(204).json(null);
  })
);

// Refactoring with rescue: do not need try and catch anymore
// Rafactoring with error middleware: to manage all res with status

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
