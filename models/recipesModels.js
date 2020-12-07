const getCollection = require('./get-collection');

const create = (name, ingredients, preparation) =>
  getCollection('users')
    .then((user) => user.insertOne({ name, ingredients, preparation }))
    .then((res) => ({ recipe: { _id: res.insertedId, name, ingredients, preparation } }));

const findByName = (name) => getCollection('users').then((users) => users.findOne({ name }));

module.exports = {
  create,
  findByName,
};
