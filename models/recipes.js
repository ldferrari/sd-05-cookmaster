const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection('recipes');
  const recipe = await db.insertOne({ name, ingredients, preparation, userId });
  console.log(recipe, 'resultado');
  return recipe;
};

module.exports = { createRecipe };
