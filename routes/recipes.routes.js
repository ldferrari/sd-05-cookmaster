const express = require('express');
const { RecipesController } = require('../controller');
const { AuthMiddlewares, RecipesMiddlewares } = require('../middlewares');

const router = express.Router();

router.post('/', AuthMiddlewares.validateJWT, RecipesMiddlewares.verifyRecipe, RecipesController.createRecipes);
module.exports = router;
