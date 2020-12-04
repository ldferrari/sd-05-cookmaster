const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await getCollection('recipes').then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));
  // console.log(newUser);
  return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

const getAll = async () =>
  getCollection('recipes').then((recipes) => recipes.find().toArray());

const getById = async (id) => getCollection('recipes')
  .then((recipes) => recipes.findOne(ObjectId(id)));

module.exports = {
  getAll,
  getById,
  // getUserByEmail,
  create,
  // updateSales,
  // excludeSales,
};
