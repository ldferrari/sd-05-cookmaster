const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection('recipes').then((recipes) =>
    recipes.insertOne({ name, ingredients, preparation, userId }).then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    })));

const getAllRecipes = async () =>
  connection('recipes').then((recipes) => recipes.find({}).toArray());

const recipeByIdSearch = async (id) =>
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.findOne({ _id: ObjectId(id) }) : null));

const editRecipe = async (id, name, ingredients, preparation) =>
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
    : null));

const removeRecipe = async (id) => {
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.deleteOne({ _id: ObjectId(id) }) : null));
};

const addURLImage = async (id, url) => {
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.updateOne({ _id: ObjectId(id) }, { $set: { image: url } })
    : null));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  recipeByIdSearch,
  editRecipe,
  removeRecipe,
  addURLImage,
};
