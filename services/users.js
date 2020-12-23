/* eslint-disable */
const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const { ObjectId } = require('mongodb');

const model = require('../models/users');

const getAll = async () => model.getAll();

const getByEmail = async (email) => model.getByEmail(email);

const getUser = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const item = await model.getById(id);
  if (!item) throw { err: { code: 'invalid_data', message: 'Wrong id format' } };

  return item;
};

const create = async (name, email, password) => {
  if (!name && !email) {
    throw {
      err: {
        code: 'invalid_entries',
        message: 'Invalid entries. Try again',
      },
    };
  }
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!validEmail.test(email)) {
    throw {
      err: {
        code: 'invalid_entries',
        message: 'Invalid entries. Try again',
      },
    };
  }
  const allUsers = await getAll();
  if (allUsers.map((e) => e.email).includes(email)) {
    throw { err: { code: 'email_used', message: 'Email already registered' } };
  }

  return model.createUser(name, email, password, 'user');
};

const login = async (email, password) => {
  if (!password && !email) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'All fields must be filled',
      },
    };
  }
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!validEmail.test(email)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Incorrect username or password',
      },
    };
  }
  const gotUser = await getByEmail(email);
  if (password !== gotUser.password) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Incorrect username or password',
      },
    };
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ name, email, role: gotUser.role }, secret, jwtConfig);

  return token;
};

const update = async (id, name, quantity) => {
  if (name.length < 5) {
    console.log(name);
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (typeof quantity === 'string') {
    throw { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  if (quantity <= 0) {
    throw {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    };
  }

  return model.updateProduct(id, name, quantity);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  const item = await model.getById(id);
  if (!item) throw { err: { code: 'invalid_data', message: 'Wrong id format' } };
  return model.deleteProduct(id);
};

module.exports = { getAll, getUser, remove, update, create, login };
