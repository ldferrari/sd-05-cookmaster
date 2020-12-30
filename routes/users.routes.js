const express = require('express');
const { UserController } = require('../controller');
const { AuthMiddlewares, UserMiddlewares } = require('../middlewares');

const router = express.Router();

router.post('/', UserMiddlewares.verifyUser, UserController.createUser);
router.post(
  '/admin',
  UserMiddlewares.verifyUser,
  AuthMiddlewares.validateJWT,
  AuthMiddlewares.isAdmin,
  UserController.createAdmin,
);

module.exports = router;
