const { Router } = require('express');
const controllers = require('../controllers');

const usersRouter = Router();

usersRouter.post('/', controllers.users.create);

// usersRouter.get('/:id', controllers.users.getById);
// usersRouter.put('/', controllers.users.update);
// usersRouter.delete('/', controllers.users.delete);
// usersRouter.get('/', controllers.users.getAll);

module.exports = usersRouter;
