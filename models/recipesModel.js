const getCollection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation }, userId) =>
  getCollection('recipes')
    .then((collection) => collection.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

module.exports = {
  createRecipe,
};
