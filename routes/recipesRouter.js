const { Router } = require('express');
const controllers = require('../controllers/index');
const middlewares = require('../middlewares/index');

const recipesRouter = Router();

recipesRouter.get('/', controllers.recipes.listRecipes);
recipesRouter.post('/', middlewares.authorization(), controllers.recipes.createRecipe);

module.exports = recipesRouter;
