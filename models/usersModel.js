const cookMasterCollection = require('./connection');

const create = async (name, email, password, role = 'user') =>
  cookMasterCollection('users')
    .then((users) => users.insertOne({ name, email, password, role }))
    .then((result) => ({ _id: result.insertedId, name, email, role }));

const getEmail = async ({ email }) =>
  cookMasterCollection('users').then((result) => result.findOne({ email }));

module.exports = {
  create,
  getEmail,
};
