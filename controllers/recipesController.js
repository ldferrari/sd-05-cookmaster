const { Router } = require('express');

const recipesRouter = Router();
const rescue = require('express-rescue');
const multer = require('multer');

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
  }),
);

// 4 - Crie um endpoint para a listagem de receitas
// Sem discriminar se a pessoa está identificada ou não
recipesRouter.get(
  '/',
  rescue(async (_req, res) => {
    const recipes = await recipesModel.getAll();
    res.status(200).json(recipes);
  }),
);

// 5 - Crie um endpoint para visualizar uma receita específica
recipesRouter.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipeById = await recipesServices.getById(id);
    res.status(200).json(recipeById);
  }),
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
      userId,
    );
    // if (!updatedRecipe) return res.status(400).json({ message: 'Recipe was not updated' });
    return res.status(200).json(updatedRecipe);
  }),
);

// 8 - Crie um endpoint para a exclusão de uma receita
recipesRouter.delete(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    await recipesServices.deleteById(id);
    // const deletedRecipe = await recipesServices.deleteById(id);
    // if (!deletedRecipe) return res.status(400).json({ message: 'Recipe was not deleted' });
    return res.status(204).json(null);
  }),
);

// Refactoring with rescue: do not need try and catch (err 500) anymore
// Refactoring with error middleware: to manage all res w/ other status

// 9 - Crie um endpoint para a adição de uma imagem a uma receita
// 10 - Crie um endpoint para acessar a imagem de uma receita
// Modelo de code: https://github.com/tryber/sd-05-live-lectures/pull/54/files

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

recipesRouter.put('/:id/image/', upload.single('image'), validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  await recipesModel.updateImage(id);
  const recipeWithId = await recipesModel.getById(id);
  res.status(200).json(recipeWithId);
  // console.log(req.file);
}));

// http://localhost:3000/images/5fcab2065ca2fba6775abdcd.jpeg shows img!

module.exports = recipesRouter;
