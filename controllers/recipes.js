/* eslint-disable */
const { Router } = require('express');

const multer = require('multer');

const services = require('../services/recipes');

const recipesRouter = Router();

recipesRouter.get('/recipes', async (req, res) => {
  const recipes = await services.getAll();
  res.status(200).json(recipes);
});

recipesRouter.post('/', async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;

    const token = await services.cadastro(name, ingredients, preparation);
    return res.status(200).json(token);
  } catch (error) {
    if (error.err.code === 'invalid_entries') return res.status(400).json(error);
    if (error.err.code === 'invalid_jwt') return res.status(401).json(error);
    console.error(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

recipesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await services.getRecipe(id);
    res.status(200).json(products);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(404).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

recipesRouter.put('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const updated = await services.update(id, name, ingredients, preparation, userId);
    res.status(200).json(updated);
  } catch (error) {
    if (error.err.code === 'missing_token') return res.status(401).json(error);
    if (error.err.code === 'invalid_token') return res.status(401).json(error);
    if (error.err.code === 'not_ownwe') return res.status(401).json(error);

    res.status(500).json({ message: 'Deu ruim' });
  }
});

recipesRouter.put('/:id', async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const updated = await services.update(id, name, ingredients, preparation, userId);
    res.status(200).json(updated);
  } catch (error) {
    if (error.err.code === 'missing_token') return res.status(401).json(error);
    if (error.err.code === 'invalid_token') return res.status(401).json(error);
    if (error.err.code === 'not_ownwe') return res.status(401).json(error);

    res.status(500).json({ message: 'Deu ruim' });
  }
});

recipesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await services.remove(id);
    res.status(204).json(deleted);
  } catch (error) {
    if (error.err.code === 'missing_token') return res.status(401).json(error);
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = recipesRouter;
