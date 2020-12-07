const { Router } = require('express');
const controllers = require('../controllers/index');
const middlewares = require('../middlewares/index');

const recipesRouter = Router();

recipesRouter.post('/', middlewares.authorization(), controllers.recipes.createRecipe);

module.exports = recipesRouter;
