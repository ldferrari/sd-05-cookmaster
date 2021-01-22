const multer = require('multer');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const autJWT = require('../service/autJWT');
const recipesService = require('../service/recipesService');
const recipesModels = require('../models/recipesModels');

const recipesRouter = Router();

recipesRouter.post('/', autJWT, async (req, res) => {
  const recipe = req.body;
  const auth = req.headers.authorization;
  const secret = 'segredo';
  const payload = jwt.verify(auth, secret);
  const userId = payload.sub;
  try {
    const newRecipe = await recipesService.createRecipe(recipe, userId);

    if (newRecipe.err) {
      return res.status(newRecipe.statusCode).json({ message: newRecipe.message });
    }
    res.status(201).json({ recipe: newRecipe });
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipesRouter.get('/', async (req, res) => {
  try {
    const allRecipe = await recipesModels.findAll();
    res.status(200).json(allRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const oneRecipe = await recipesService.findByID(id);

    if (oneRecipe.err) {
      return res.status(oneRecipe.statusCode).json({ message: oneRecipe.message });
    }
    res.status(200).json(oneRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipesRouter.put('/:id', autJWT, async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const secret = 'segredo';
    const payload = jwt.verify(auth, secret);
    const userId = payload.sub;
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const newRecipe = await recipesModels.upRecipe(id, name, ingredients, preparation, userId);
    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

recipesRouter.delete('/:id', autJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const delRecipe = await recipesModels.deleteRecipe(id);

    if (delRecipe.err) {
      return res.status(delRecipe.statusCode).json({ message: delRecipe.message });
    }
    res.status(204).json('successfully deleted');
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});
const upload = multer({ storage });

recipesRouter.put('/:id/image/', upload.single('image'), autJWT, async (req, res) => {
  try {
    const { id } = req.params;
    await recipesModels.imageAdd(id);
    const returnId = await recipesModels.findByID(id);
    res.status(200).json(returnId);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = recipesRouter;
