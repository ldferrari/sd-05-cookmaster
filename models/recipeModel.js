const { ObjectID } = require('mongodb');
const getCollection = require('./getCollection');

const addRecipe = async (name, ingredients, preparation) => {
  console.log('.');
  return getCollection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
    }));
};

const getAllRecipes = async () =>
  getCollection('recipes').then((recipes) => recipes.find().toArray());

const getRecipeById = async (id) =>
  getCollection('recipes').then((recipes) => recipes.findOne(ObjectID(id)));

module.exports = { addRecipe, getAllRecipes, getRecipeById };
