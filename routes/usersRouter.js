const { Router } = require('express');
const controllers = require('../controllers');

const usersRouter = Router();

usersRouter.post('/', controllers.users.create);

module.exports = usersRouter;
