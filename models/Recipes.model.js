const { ObjectId } = require('mongodb');
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
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));
  return newRecipe;
};
const listAllRecipes = async () => {
  const recipes = await getCollection(TABLES.recipes).then((db) =>
    db.find().toArray());
  return recipes;
};
const listRecipeById = async (recipeId) => {
  const recipes = await getCollection(TABLES.recipes).then((db) =>
    db.findOne(ObjectId(recipeId)));
  return recipes;
};
const updateRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await listRecipeById(id);
  await getCollection(TABLES.recipes).then((db) =>
    db.updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    ));
  return { ...recipe, name, ingredients, preparation };
};

const removeRecipe = async (id) => {
  await getCollection(TABLES.recipes).then((db) => db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  listAllRecipes,
  listRecipeById,
  updateRecipe,
  removeRecipe,
};
