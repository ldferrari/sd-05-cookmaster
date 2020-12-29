const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const { ObjectId } = require('mongodb');

const model = require('../models/users');
const errorGenerator = require('../errorGenerator');

const getAll = async () => model.getAll();

const getByEmail = async (email) => model.getByEmail(email);

const getUser = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw errorGenerator('invalid_data', 'Wrong id format');
  }
  const item = await model.getById(id);
  if (!item) throw errorGenerator('invalid_data', 'Wrong id format');

  return item;
};

const create = async (name, email, password, type = 'user') => {
  if (!name || !email || !password) {
    throw errorGenerator('invalid_entries', 'Invalid entries. Try again.');
  }
  const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!validEmail.test(email)) {
    throw errorGenerator('invalid_entries', 'Invalid entries. Try again.');
  }
  const allUsers = await getAll();
  if (allUsers.map((e) => e.email).includes(email)) {
    if (type === 'admin') {
      return model.updateUser(name, email, password, type);
    }
    throw errorGenerator('email_used', 'Email already registered');
  }
  return model.createUser(name, email, password, type);
};

const login = async (email, password) => {
  if (!password || !email) {
    throw errorGenerator('invalid_data', 'All fields must be filled');
  }
  const gotUser = await getByEmail(email);
  if (!gotUser) {
    throw errorGenerator('invalid_data', 'Incorrect username or password');
  }
  if (password !== gotUser.password) {
    throw errorGenerator('invalid_data', 'Incorrect username or password');
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ name: gotUser.name, email, role: gotUser.role }, secret, jwtConfig);

  return { token };
};

const update = async (id, name, quantity) => {
  if (name.length < 5) {
    throw errorGenerator('invalid_data', '"name" length must be at least 5 characters long');
  }
  if (typeof quantity === 'string') {
    throw errorGenerator('invalid_data', '"quantity" must be a number');
  }
  if (quantity <= 0) {
    throw errorGenerator('invalid_data', '"quantity" must be larger than or equal to 1');
  }

  return model.updateProduct(id, name, quantity);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw errorGenerator('invalid_data', 'Wrong id format');
  }
  const item = await model.getById(id);
  if (!item) throw errorGenerator('invalid_data', 'Wrong id format');
  return model.deleteProduct(id);
};

module.exports = { getAll, getUser, remove, update, create, login };
