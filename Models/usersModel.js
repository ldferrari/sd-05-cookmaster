// const { ObjectId } = require('mongodb');

// const product = require('../Controllers/productsController');

const getCollection = require('./get-connection');

const getByEmail = async ({ email }) =>
  getCollection('users').then((emai) => emai.findOne({ email }));

const create = async (name, email, password, role = 'user') =>
  getCollection('users')
    .then((user) => user.insertOne({ name, email, password, role }))
    .then((result) => ({ _id: result.insertedId, name, email, role }));

module.exports = {
  getByEmail,
  create,
};
