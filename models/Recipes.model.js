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
  await getCollection(TABLES.recipes).then((db) =>
    db.updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    ));
  const recipe = await listRecipeById(id);
  return recipe;
};

const removeRecipe = async (id) => {
  await getCollection(TABLES.recipes).then((db) => db.deleteOne({ _id: ObjectId(id) }));
};

const addImage = async (id) => {
  await getCollection(TABLES.recipes).then((db) =>
    db.updateOne(
      { _id: ObjectId(id) },
      { $set: { image: `localhost:3000/images/${id}.jpeg` } },
    ));
  const recipe = await listRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  listAllRecipes,
  listRecipeById,
  updateRecipe,
  removeRecipe,
  addImage,
};
