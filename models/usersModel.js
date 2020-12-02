const getCollection = require('./getCollection');

const create = async (name, email, password) =>
  getCollection('users')
    .then((user) => user.insertOne({ name, email, password, role: 'user' }))
    .then((result) => ({ user: { name, email, password, role: 'user', _id: result.insertedId } }));

const checkEmail = async (email) => getCollection('users').then((user) => user.findOne({ email }));

module.exports = {
  create,
  checkEmail,
};
