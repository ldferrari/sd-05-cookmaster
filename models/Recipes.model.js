const getCollection = require('./connection.models');

const { TABLES } = require('../enumerators/databaseEnums');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await getCollection(TABLES.recipes)
    .then((db) =>
      db.insertOne({
        name,
        ingredients,
        preparation,
        userId,
      }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));
  return newRecipe;
};

const listRecipe = async () => {
  const recipes = await getCollection(TABLES.recipes)
    .then((db) =>
      db.find().toArray());
  console.log(recipes);
  return recipes;
};

module.exports = { createRecipe, listRecipe };
