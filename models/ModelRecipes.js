const { ObjectId } = require('mongodb');
const getCollection = require('./get-collection');

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const db = await getCollection('recipes');
  const result = await db.insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await getCollection('recipes');
  const result = await db.find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await getCollection('recipes');
  if (!ObjectId.isValid(id)) return null;

  const result = await db.findOne({ _id: ObjectId(id) });
  return result;
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getCollection('recipes');
  const recipe = await db.findOne({ _id: ObjectId(id) });
  if (!recipe) return null;
  const result = await db.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  return result;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getCollection('recipes');
  const result = await db.deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getById,
  update,
  remove,
};
