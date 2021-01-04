const { Router } = require('express');
const multer = require('multer');
const {
  newRecipeService,
  getAllRecipesService,
  getOneRecipeService,
  editOneRecipeService,
  deleteOneRecipeService,
  updateWithImageService,
} = require('../service').recipes;
const hasToken = require('../middleware/hasToken');

const route = Router();

route.post('/', hasToken, async (req, res) => {
  let userId = null;
  if (req.user) {
    const {
      user: {
        data: { _id: id },
      },
    } = req;
    userId = id;
  }
  const { name, ingredients, preparation } = req.body;
  const result = await newRecipeService(
    name,
    ingredients,
    preparation,
    null,
    userId,
  );

  if (result.message) {
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
});

// Source: Paulo Dandrea

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

route.put('/:id/image', upload.single('image'), hasToken, async (req, res) => {
  const { id } = req.params;
  const result = await updateWithImageService(id);

  return res.status(200).json(result);
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

route.put('/:id', hasToken, async (req, res) => {
  let user = null;
  if (req.user) {
    const {
      user: { data: userData },
    } = req;
    user = userData;
  }
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const result = await editOneRecipeService(
    name,
    ingredients,
    preparation,
    user,
    id,
  );

  if (result.message) {
    return res.status(403).json(result);
  }

  return res.status(200).json(result);
});

route.delete('/:id', hasToken, async (req, res) => {
  const { id } = req.params;
  const result = await deleteOneRecipeService(id);

  return res.status(204).json(result);
});

module.exports = route;
