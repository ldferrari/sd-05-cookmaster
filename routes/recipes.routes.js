const express = require('express');
const { RecipesController } = require('../controller');
const { AuthMiddlewares, RecipesMiddlewares } = require('../middlewares');

const router = express.Router();

router.post('/', AuthMiddlewares.validateJWT, RecipesMiddlewares.verifyRecipe, RecipesController.createRecipes);
router.get('/', RecipesController.listRecipe);
module.exports = router;
