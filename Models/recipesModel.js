const getCollection = require('./get-connection');

const create = async (name, ingredients, preparation, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

module.exports = {
  create,
};
