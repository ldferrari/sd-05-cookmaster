const getCollection = require('./connection');

const create = async ({ name, email, password }) =>
  getCollection('users')
    .then((collection) => collection.insertOne({ name, email, password, role: 'user' }))
    .then((result) => ({ name, email, role: 'user', _id: result.insertedId }));

const getByEmail = async (email) => {
  getCollection('users')
    .then((collection) => collection.findOne({ email }));
};

module.exports = {
  create,
  getByEmail,
};
