const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password) =>
  connection('users')
    .then((users) => users.insertOne({ name, email, password, role: 'user' }))
    .then((result) => ({ _id: result.insertedId, name, email, role: 'user' }));

const getByEmail = (email) => connection('users').then((users) => users.findOne({ email }));

const getById = (id) =>
  connection('users').then((users) => {
    if (ObjectId.isValid(id)) {
      return users.findOne({ _id: ObjectId(id) });
    }
    return null;
  });

module.exports = {
  createUser,
  getByEmail,
  getById,
};
