const { Router } = require('express');

const multer = require('multer');
const auth = require('../middleware/auth');
const recipesFields = require('../middleware/recipesFields');

const services = require('../services/recipes');

const recipesRouter = Router();

recipesRouter.get('/', async (req, res) => {
  const recipes = await services.getAll();
  res.status(200).json(recipes);
});

recipesRouter.post('/', auth, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { email } = req.payload;
    const token = await services.cadastro(name, ingredients, preparation, email);
    return res.status(201).json(token);
  } catch (error) {
    if (error.code === 'invalid_entries') return res.status(400).json(error);
    if (error.code === 'invalid_jwt') return res.status(401).json(error);
    if (error.code === 'invalid_user') return res.status(401).json(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

recipesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await services.getRecipe(id);
    res.status(200).json(recipes);
  } catch (error) {
    if (error.code === 'invalid_data') {
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
    const ext = file.mimetype.match(/.*\/(.*)$/);
    callback(null, `${req.params.id}.${ext[1]}`);
  },
});

const upload = multer({ storage });

recipesRouter.put('/:id/image', auth, upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    const { id } = req.params;
    const { email } = req.payload;
    const newPath = `localhost:3000/images/${req.file.filename}`;
    const updated = await services.updateImage(id, email, newPath);
    res.status(200).json(updated);
  } catch (error) {
    if (error.code === 'missing_token') return res.status(401).json(error);
    if (error.code === 'invalid_token') return res.status(401).json(error);
    if (error.code === 'not_ownwe') return res.status(401).json(error);

    res.status(500).json({ message: 'Deu ruim' });
  }
});

recipesRouter.put('/:id', auth, recipesFields, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { email } = req.payload;
    const { id } = req.params;
    const updated = await services.update(id, name, ingredients, preparation, email);
    res.status(200).json(updated);
  } catch (error) {
    if (error.code === 'missing_token') return res.status(401).json(error);
    if (error.code === 'invalid_token') return res.status(401).json(error);
    if (error.code === 'not_ownwe') return res.status(401).json(error);

    res.status(500).json({ message: 'Deu ruim' });
  }
});

recipesRouter.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.payload;
    const deleted = await services.remove(id, email);
    res.status(204).json(deleted);
  } catch (error) {
    if (error.code === 'missing_token') return res.status(401).json(error);
    if (error.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = recipesRouter;
