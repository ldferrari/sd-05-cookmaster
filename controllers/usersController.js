const { Router } = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middlewares/inputValidation');
const usersService = require('../services/usersService');

const users = Router();

users.post(
  '/',
  validate(
    Joi.object({
      name: Joi.string().required().not().empty(),
      email: Joi.string().required().email().not()
        .empty(),
      password: Joi.string().required().not().empty(),
    }).messages({
      'any.required': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'string.email': 'Invalid entries. Try again.',
    }),
    400,
  ),
  rescue(async (req, res) => {
    const { name, email, password } = req.body;
    const createUser = await usersService.createUser(name, email, password);
    if (createUser.error) {
      res.status(createUser.statusCode).json({ message: createUser.message });
    }
    res.status(201).json(createUser);
  }),
);

module.exports = users;
