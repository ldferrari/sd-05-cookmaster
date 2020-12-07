const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const getAll = async () => connection('recipes').then((recipes) => recipes.find({}).toArray());

const getById = async (id) =>
  connection('recipes').then((recipes) => {
    if (ObjectId.isValid(id)) {
      return recipes.findOne({ _id: ObjectId(id) });
    }
    return null;
  });

module.exports = {
  createRecipe,
  getAll,
  getById,
};
