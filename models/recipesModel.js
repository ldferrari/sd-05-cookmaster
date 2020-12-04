const { ObjectId } = require('mongodb');
const mongodbConnection = require('./mongodbConnection');

const collectionName = 'recipes';

const createRecipe = async (name, ingredients, preparation, userId) => {
  const getCollection = await mongodbConnection(collectionName);
  const newRecipe = await getCollection.insertOne({ name, ingredients, preparation, userId });
  return { recipe: { name, ingredients, preparation, _id: newRecipe.insertedId } };
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

module.exports = {
  createRecipe,
  listRecipes,
  listRecipeById,
};
