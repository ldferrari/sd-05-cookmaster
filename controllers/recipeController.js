const { Router } = require('express');
const multer = require('multer');

const service = require('../service/recipesService');
const validateJWT = require('../auth/validateJWS');

const route = Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

route.get('/', async (_req, res) => {
  const recipes = await service.getAll();
  return res.status(200).json(recipes);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await service.getById(id);
  if (recipe.error) {
    if (recipe.code === 'not_found') {
      return res.status(404).json({ message: recipe.message });
    }
  }
  res.status(200).json(recipe);
});

route.post('/', validateJWT, async (req, res, _next) => {
  let userID = null;
  if (req.user) {
    const { _id: uID } = req.user;
    userID = uID;
    // console.log(userID);
  }
  const recipe = await service.create(req.body, userID);
  if (recipe.error) {
    if (recipe.code === 'invalid_data') {
      return res.status(400).json({ message: recipe.message });
    }
  }
  res.status(201).json(recipe);
});

route.put('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  let userID = null;
  if (req.user) {
    const { _id: uID } = req.user;
    userID = uID;
    // console.log(userID);
  }
  // console.log(req.body)
  const recipe = await service.update(id, req.body, userID);
  return res.status(200).json(recipe);
});

route.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const recipe = await service.deleteRecipe(id);
  return res.status(204).json(recipe);
});

route.put('/:id/image', validateJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const recipe = await service.updateImg(id);
  res.status(200).json(recipe);
});

module.exports = route;
