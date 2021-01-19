const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection('recipes');
  const recipe = await db.insertOne({ name, ingredients, preparation, userId });
  // aqui utilizei console.log(recipe) para observar o objeto retornado;
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

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection('recipes');
  await db.deleteOne({ _id: ObjectId(id) });

  return true;
};

const uploadImage = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection('recipes');
  const path = `localhost:3000/images/${id}.jpeg`;

  await db.updateOne({ _id: ObjectId(id) }, { $set: { image: path } });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
