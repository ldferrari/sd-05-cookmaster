const { Router } = require('express');
const controllers = require('../controllers/index');

const productRouter = Router();

productRouter.post('/users', controllers.users.createUser);
productRouter.post('/login', controllers.users.login);

module.exports = productRouter;
