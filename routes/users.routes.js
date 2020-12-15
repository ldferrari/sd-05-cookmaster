const express = require('express');
const { UserController } = require('../controller');
const { UserMiddlewares } = require('../middlewares');

const router = express.Router();

router.post('/', UserMiddlewares.verifyUser, UserController.createUser);

module.exports = router;
