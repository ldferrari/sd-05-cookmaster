const getCollection = require('./getCollection');

const getByEmail = async (email) =>
  getCollection('users').then((collection) => collection.findOne({ email }));

module.exports = {
  getByEmail,
};
