const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = (name, ingredients, preparation, userId) =>
  connection('recipes').then((recipes) =>
    recipes.insertOne({ name, ingredients, preparation, userId }).then((result) => ({
      id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    })));

const getAllRecipes = () =>
  connection('recipes').then((recipes) => recipes.find({}).toArray());

const recipeByIdSearch = async (id) =>
  connection('recipes').then((recipes) => (ObjectId.isValid(id) ? recipes.findOne({ _id: ObjectId(id) }) : null));

module.exports = { createRecipe, getAllRecipes, recipeByIdSearch };
