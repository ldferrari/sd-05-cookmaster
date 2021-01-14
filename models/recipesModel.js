const connection = require('./connection');

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

module.exports = { createRecipe, getAllRecipes };
