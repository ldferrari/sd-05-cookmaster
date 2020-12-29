const express = require('express');
const { RecipesController } = require('../controller');
const { AuthMiddlewares, RecipesMiddlewares } = require('../middlewares');

const router = express.Router();

router.get('/:id', RecipesMiddlewares.verifyRecipeId, RecipesController.listRecipeById);
router.get('/', RecipesController.listAllRecipes);
router.post('/', AuthMiddlewares.validateJWT, RecipesMiddlewares.verifyRecipe, RecipesController.createRecipes);
module.exports = router;
