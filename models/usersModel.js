const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const getByEmail = async (email) =>
  connection()
    .then((db) => db.collection('users'))
    .then((users) => users.findOne({ email }));

const create = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }))
    .then((result) => ({ name, email, role: 'user', password, _id: result.insertedId }));

module.exports = { getByEmail, create };
