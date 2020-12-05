const { ObjectId } = require('mongodb');
const mongodbConnection = require('./mongodbConnection');

const collectionName = 'recipes';

const createRecipe = async (name, ingredients, preparation, userId) => {
  const getCollection = await mongodbConnection(collectionName);
  const newRecipe = await getCollection.insertOne({ name, ingredients, preparation, userId });
  return { recipe: { name, ingredients, preparation, userId, _id: newRecipe.insertedId } };
};

const listRecipes = async () => {
  const getCollection = await mongodbConnection(collectionName);
  return getCollection.find().toArray();
};

const listRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const getCollection = await mongodbConnection(collectionName);
  return getCollection.findOne({ _id: ObjectId(id) });
};

const updateRecipe = async (name, ingredients, preparation, recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;
  const getCollection = await mongodbConnection(collectionName);
  const updatedRecipe = await getCollection.updateOne(
    { _id: ObjectId(recipeId) },
    { $set: { name, ingredients, preparation } },
  );
  return { _id: recipeId, name, ingredients, preparation, userId: updatedRecipe.userId };
};

const deleteRecipe = async (recipeId) => {
  const getCollection = await mongodbConnection(collectionName);
  const deletedRecipe = await getCollection.deleteOne({ _id: ObjectId(recipeId) });
  return deletedRecipe;
};

module.exports = {
  createRecipe,
  listRecipes,
  listRecipeById,
  updateRecipe,
  deleteRecipe,
};
