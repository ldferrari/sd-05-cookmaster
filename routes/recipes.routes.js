const express = require('express');
const { RecipesController } = require('../controller');
const { AuthMiddlewares, RecipesMiddlewares } = require('../middlewares');

const router = express.Router();

router.get(
  '/:id',
  RecipesMiddlewares.verifyRecipeId,
  RecipesController.listRecipeById,
);
router.get('/', RecipesController.listAllRecipes);
router.post(
  '/',
  AuthMiddlewares.validateJWT,
  RecipesMiddlewares.verifyRecipe,
  RecipesController.createRecipes,
);
router.put(
  '/:id',
  AuthMiddlewares.validateJWT,
  RecipesMiddlewares.verifyRecipeId,
  RecipesMiddlewares.verifyRecipe,
  RecipesController.updateRecipe,
);
router.delete(
  '/:id',
  AuthMiddlewares.validateJWT,
  RecipesMiddlewares.verifyRecipeId,
  RecipesMiddlewares.canRemove,
  RecipesController.removeRecipe,
);
module.exports = router;
