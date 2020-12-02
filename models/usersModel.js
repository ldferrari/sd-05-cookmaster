const getCollection = require('./connection');

const getAll = async () =>
  getCollection('users').then((collection) => collection.find().toArray());

const create = async ({ name, email, password }) => {
  const user = await getCollection('users').then((collection) => collection.insertOne({ name, email, password, role: 'user' }));
  return { _id: user.insertedId, name, email, password, role: 'user' };
};

const getByEmail = async (email) =>
  getCollection('users').then((collection) => collection.findOne({ email }));

module.exports = {
  getAll,
  create,
  getByEmail,
};
