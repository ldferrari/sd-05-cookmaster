const getCollection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  getCollection('recipes')
    .then((newRecipe) => newRecipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const findAll = async () =>
  getCollection('recipes')
    .then((allRecipe) => allRecipe.find().toArray());

module.exports = {
  createRecipe,
  findAll,
};
