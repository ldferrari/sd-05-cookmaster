const { Router } = require('express');

const controllers = require('../controllers');

const middlewares = require('../middlewares');

const recipesRouter = Router();

recipesRouter.post('/', middlewares.auth.authToken, controllers.recipes.create);

recipesRouter.get('/:id', controllers.recipes.getById);
// recipesRouter.put('/', controllers.recipes.update);
// recipesRouter.delete('/', controllers.recipes.delete);
recipesRouter.get('/', controllers.recipes.getAll);

module.exports = recipesRouter;
