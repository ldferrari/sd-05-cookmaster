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

const updateRecipe = async (id, payload) => {
  // Verifica se a receita desejada existe
  const recipe = await getRecipeById(id);
  if (!recipe) return null;
  // Se a receita existe, será atualizada
  const { name, ingredients, preparation } = payload;
  const db = await connection('recipes');
  const updatedRecipe = await db.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name,
        ingredients,
        preparation,
      },
    },
  );

  return updatedRecipe;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe };
