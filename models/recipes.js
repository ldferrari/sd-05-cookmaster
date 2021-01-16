const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const register = async (name, ingredients, preparation, userId) => {
  const registerRecipe = await getCollection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));

  return { recipe: { _id: registerRecipe.insertedId, name, ingredients, preparation, userId } };
};

const getAll = async () => getCollection('recipes').then((recipes) => recipes.find().toArray());

const getById = async (id) => getCollection('recipes').then((recipes) => recipes.findOne(ObjectId(id)));

const editById = async (id, payload, userId) => {
  const { name, ingredients, preparation } = payload;

  const recipes = await getCollection('recipes');

  await recipes.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return { _id: id, name, ingredients, preparation, userId };
};

const removeById = async (id) => getCollection('recipes').then((recipes) => recipes.deleteOne({ _id: ObjectId(id) }));

const saveImage = async (id, recipe) => {
  const recipes = await getCollection('recipes');

  const result = await recipes.updateOne(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/images/${id}.jpeg` } },
  ).then(() => ({ image: `localhost:3000/images/${id}.jpeg` }));

  return { ...recipe, ...result };
};

module.exports = {
  register,
  getAll,
  getById,
  editById,
  removeById,
  saveImage,
};
