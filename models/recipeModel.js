const connection = require('./connection');

async function createRecipe(name, ingredients, preparation, userId) {
  const insertRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return { name, ingredients, preparation, userId, _id: insertRecipe.insertedId };
}

async function getAllRecipes() {
  const allRecipes = await connection().then((db) => {
    db.collection('recipes').find().toArray();
  });
  console.log(allRecipes);
  return allRecipes;
}

module.exports = { createRecipe, getAllRecipes };
