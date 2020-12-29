const { ObjectId } = require('mongodb');
const getCollection = require('./connection.models');

const { TABLES } = require('../enumerators/databaseEnums');

module.exports = {
  createRecipe: async (name, ingredients, preparation, userId) => {
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
  },
  listAllRecipes: async () => {
    const recipes = await getCollection(TABLES.recipes)
      .then((db) =>
        db.find().toArray());
    return recipes;
  },
  listRecipeById: async (recipeId) => {
    const recipes = await getCollection(TABLES.recipes)
      .then((db) =>
        db.findOne(ObjectId(recipeId)));
    return recipes;
  },
};
