const { Router } = require('express');
const controllers = require('../controllers');

const loginRouter = Router();

loginRouter.post('/login', controllers.login.login);

module.exports = loginRouter;
