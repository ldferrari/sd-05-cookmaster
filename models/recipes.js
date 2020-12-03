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

const updateRecipe = async (id, query) => {
  const { name, ingredients, preparation } = query;

  const db = await connection('recipes');

  if (!ObjectId.isValid(id)) return null;

  const recipe = await db.findOne({ _id: ObjectId(id) });

  if (!recipe) return null;

  const updatedRecipe = await db.updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
  );

  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connection('recipes');

  if (!ObjectId.isValid(id)) return null;

  await db.deleteOne({ _id: ObjectId(id) });

  return true;
};

const addImage = async (id) => {
  const db = await connection('recipes');
  const imagePath = `localhost:3000/images/${id}.jpeg`;

  await db.updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } });

  const updatedImg = await db.findOne({ _id: ObjectId(id) });

  return updatedImg;
};

module.exports = {
  addImage,
  addRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
};
