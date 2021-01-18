const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection('recipes');
  const recipe = await db.insertOne({ name, ingredients, preparation, userId });
  // console.log(recipe);
  return recipe.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection('recipes');
  const result = await db.find().toArray();

  return result;
};

module.exports = { createRecipe, getAllRecipes };
