const express = require('express');
const { LoginController } = require('../controller');
const { UserMiddlewares } = require('../middlewares');

const { verifyEmail, verifyPassword } = UserMiddlewares;

const router = express.Router();

router.post('/', verifyEmail, verifyPassword, LoginController.loginUser);

module.exports = router;
