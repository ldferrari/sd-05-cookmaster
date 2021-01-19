const multer = require('multer');
const express = require('express');
const rescue = require('express-rescue');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyNewRecipe } = require('../services/recipes');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
} = require('../models/recipes');

const recipesController = express.Router();

// 3 - Crie um endpoint para o cadastro de receitas
recipesController.post(
  '/',
  verifyNewRecipe,
  verifyToken,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;

    const recipe = await createRecipe({
      name,
      ingredients,
      preparation,
      userId,
    });

    return res.status(201).json({ recipe });
  }),
);

// 4 - Crie um endpoint para a listagem de receitas.
recipesController.get(
  '/',
  rescue(async (_, res) => {
    const recipes = await getAllRecipes();

    return res.status(200).json(recipes);
  }),
);

// 5 - Crie um endpoint para visualizar uma receita específica
recipesController.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  }),
);

// 7 - Crie um endpoint para a edição de uma receita.
recipesController.put(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const { name, ingredients, preparation } = req.body;

    const payload = { name, ingredients, preparation };
    const recipe = await updateRecipe(id, payload, userId);

    if (recipe) {
      const updatedRecipe = await getRecipeById(id);
      return res.status(200).json(updatedRecipe);
    }

    return res.status(404).json({ message: 'recipe not found' });
  }),
);

// 8 - Crie um endpoint para a exclusão de uma receita
recipesController.delete(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const { id } = req.params;

    await deleteRecipe(id);

    return res.status(204).json(null);
  }),
);

// 9 - Crie um endpoint para a adição de uma imagem a uma receita
// 10 - Crie um endpoint para acessar a imagem de uma receita
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

recipesController.put('/:id/image/', verifyToken, upload.single('image'), rescue(async (req, res) => {
  const { id } = req.params;

  await uploadImage(id);

  const recipe = await getRecipeById(id);

  return res.status(200).json(recipe);
}));

module.exports = recipesController;
