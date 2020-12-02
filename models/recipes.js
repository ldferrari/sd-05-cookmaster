const { ObjectId } = require('mongodb');
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

const getRecipe = async (id) => {
  const db = await connection('recipes');
  if (ObjectId.isValid(id)) {
    const result = await db.findOne({ _id: ObjectId(id) });
    return result;
  }
  return null;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipe,
};
