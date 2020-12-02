const connection = require('./connection');

const addRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection('recipes');
  const result = await db.insertOne({ name, ingredients, preparation, userId });

  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection('recipes');
  const result = await db.find().toArray();

  return result;
};

module.exports = {
  addRecipe,
  getAllRecipes,
};
