const { ObjectId } = require('mongodb');
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

const getRecipeById = async (id) => {
  const db = await connection('recipes');
  if (ObjectId.isValid(id)) {
    const result = await db.findOne({ _id: ObjectId(id) });

    return result;
  }
  return null;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById };
