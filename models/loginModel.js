const getCollection = require('./connection');

const getByEmail = async (email) =>
  getCollection('users').then((collection) => collection.findOne({ email }));

module.exports = {
  getByEmail,
};
