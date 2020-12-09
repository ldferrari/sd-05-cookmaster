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

const updateRecipe = async (recipeID, name, ingredients, preparation, userID) => {
  if (!ObjectId.isValid(recipeID)) return;
  connection('recipes').then((recipes) =>
    recipes.updateOne({
      _id: ObjectId(recipeID) }, { $set: { name, ingredients, preparation, userID },
    }));
  const updatedRecipe = { _id: recipeID, name, ingredients, preparation, userID };
  console.log(updatedRecipe);
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection('recipes').then((recipes) => recipes.deleteOne({ _id: ObjectId(id) }));
  }
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
};
