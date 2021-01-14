const connection = require('./connection');

const createRecipe = (name, ingredients, preparation, userId) =>
  connection('recipes').then((users) =>
    users.insertOne({ name, ingredients, preparation, userId }).then((result) => ({
      id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    })));

module.exports = { createRecipe };
