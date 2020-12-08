const { ObjectId } = require('mongodb');
const getCollection = require('./getCollection');

const getAll = async () =>
  getCollection('recipes').then((collection) => collection.find().toArray());

const create = async ({ name, ingredients, preparation }, { userId }) => {
  const recipe = await getCollection('recipes').then((collection) => collection.insertOne({ name, ingredients, preparation, userId }));
  return { name, ingredients, preparation, userId, _id: recipe.insertedId };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('recipes').then((collection) => collection.findOne(ObjectId(id)));
};

const update = async (id, { name, ingredients, preparation }, userId) => {
  if (!ObjectId.isValid(id)) return null;
  await getCollection('recipes').then((collection) =>
    collection.updateOne({ _id: Object(id) },
      { $set: { name, ingredients, preparation, userId } }));
  return { _id: id, name, ingredients, preparation, userId };
};

const delRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('recipes').then((collection) => collection.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  delRecipe,
};
