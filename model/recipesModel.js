const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

module.exports = {
  createRecipe,
};
