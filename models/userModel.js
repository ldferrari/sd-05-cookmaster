// const { ObjectId } = require('mongodb');
const getCollection = require('./getCollection');

const addUserModel = async (name, email, password, role) =>
  getCollection('users')
    .then((users) => users.insertOne({ name, email, password, role }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      email,
      password,
      role,
    }));

const findEmailModel = async (email) =>
  getCollection('users').then((users) => users.findOne({ email }));

module.exports = { addUserModel, findEmailModel };
