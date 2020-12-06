const connection = require('./connection');

async function createRecipe(name, ingredients, preparation, userId) {
  const insertRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return { name, ingredients, preparation, userId, _id: insertRecipe.insertedId };
}

async function getAllRecipes() {
  return connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.find().toArray());
}

module.exports = { createRecipe, getAllRecipes };
