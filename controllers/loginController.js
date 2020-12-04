const { Router } = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const loginServices = require('../services/loginServices');
const validate = require('../middlewares/inputValidation');

const login = Router();

login.post(
  '/',
  validate(
    Joi.object({
      email: Joi.string().required().not().empty(),
      password: Joi.string().required().not().empty(),
    }).messages({
      'any.required': 'All fields must be filled',
      'string.empty': 'All fields must be filled',
    }),
    401,
  ),
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const token = await loginServices.validateLogin(email, password);
    if (token.error) {
      res.status(token.statusCode).json({ message: token.message });
    }
    res.status(200).json(token);
  }),
);

module.exports = login;
