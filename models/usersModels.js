// const { ObjectId } = require('mongodb');
const getCollection = require('./get-collection');

const create = (name, email, password, role = 'user') =>
  getCollection('users')
    .then((user) => user.insertOne({ name, email, password, role }))
    .then((res) => ({ user: { _id: res.insertedId, name, email, role } }));

const findByEmail = (email) => getCollection('users').then((users) => users.findOne({ email }));

// const verifyPassword = (email, password) =>
//   getCollection('users').then((users) => users.findOne({ email, password }));

module.exports = {
  create,
  findByEmail,
  // verifyPassword,
};
