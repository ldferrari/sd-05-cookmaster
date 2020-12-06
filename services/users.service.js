const Joi = require('@hapi/joi');
const crudModel = require('../models/crud.model');
const {
  generateToken,
} = require('../auth/token.auth');

const COLLECTION = 'users';

const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const REGISTER_SCHEMA = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const INVALID_DATA = {
  code: 'invalid_data',
  status: 400,
  message: 'Invalid entries. Try again.',
};

const registerUser = async (req, _res, next) => {
  try {
    const { name, email, password } = req.body;
    const { error } = REGISTER_SCHEMA.validate({ name, email, password });
    if (error) throw new Error(error);
    if (await crudModel.readDocument({ email }, COLLECTION)) {
      next({ ...INVALID_DATA, message: 'Email already registered', status: 409 });
      return;
    }
    req.data = await crudModel.createDocument({
      name, email, password, role: 'user',
    }, COLLECTION);
    next();
  } catch ({ message }) {
    console.error(message);
    next({ ...INVALID_DATA });
  }
};

const loginUser = async (req, _res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = LOGIN_SCHEMA.validate({ email, password });
    if (error) throw new Error(error);
    const response = await crudModel
      .readDocument({ email, password }, COLLECTION);
    if (response) {
      const { _id, role } = response;
      const token = await generateToken({ _id, role, email });
      req.data = token;
      next();
      return;
    }
    next({ ...INVALID_DATA, status: 401, message: 'Incorrect username or password' });
  } catch ({ message }) {
    console.error(message);
    next({ ...INVALID_DATA, status: 401, message: 'All fields must be filled' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
