const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const register = async (name, ingredients, preparation, userId) => {
  const registerRecipe = await getCollection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));

  return { recipe: { _id: registerRecipe.insertedId, name, ingredients, preparation, userId } };
};

const getAll = async () => getCollection('recipes').then((recipes) => recipes.find().toArray());

const getById = async (id) => getCollection('recipes').then((recipes) => recipes.findOne(ObjectId(id)));

module.exports = {
  register,
  getAll,
  getById,
};
