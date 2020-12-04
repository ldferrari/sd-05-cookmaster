const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation }, userId) =>
  getCollection('recipes')
    .then((collection) => collection.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const getAll = async () => getCollection('recipes').then((collection) => collection.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('recipes').then((collection) => collection.findOne(ObjectId(id)));
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
