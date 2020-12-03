// const { ObjectId } = require('mongodb');
const getCollection = require('./get-collection');

const create = (name, email, role = 'user') =>
  getCollection('users')
    .then((user) => user.insertOne({ name, email, role }))
    .then((res) => ({ user: { _id: res.insertedId, name, email, role } }));

const findByEmail = (email) => getCollection('users').then((users) => users.findOne({ email }));

module.exports = { create, findByEmail };
