const { Router } = require('express');

const controllers = require('../controllers');

const middlewares = require('../middlewares');

const recipesRouter = Router();

recipesRouter.post('/', middlewares.auth.authToken, controllers.recipes.create);
recipesRouter.get('/:id', controllers.recipes.getById);
recipesRouter.put('/:id', middlewares.auth.authToken, controllers.recipes.updateById);
recipesRouter.delete('/:id', middlewares.auth.authToken, controllers.recipes.removeById);
recipesRouter.get('/', controllers.recipes.getAll);

module.exports = recipesRouter;
