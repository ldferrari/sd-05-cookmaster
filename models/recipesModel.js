const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('recipes').then((collection) => collection.findOne(ObjectId(id)));
};

const getAll = async () =>
  getCollection('recipes').then((collection) => collection.find().toArray());

const create = async ({ name, ingredients, preparation }, { userId }) => {
  const recipe = await getCollection('recipes').then((collection) => collection.insertOne({ name, ingredients, preparation, userId }));
  return { name, ingredients, preparation, userId, _id: recipe.insertedId };
};

const update = async (id, { name, ingredients, preparation }, userId) => {
  if (!ObjectId.isValid(id)) return null;
  await getCollection('recipes').then((collection) =>
    collection.updateOne({ _id: Object(id) },
      { $set: { name, ingredients, preparation, userId } }));
  return { _id: id, name, ingredients, preparation, userId };
};

const updateImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;
  await getCollection('recipes').then((collection) =>
    collection.updateOne({ _id: Object(id) },
      { $set: { image } }));
  const { name, ingredients, preparation, userId } = await getById(id);

  return { _id: id, name, ingredients, preparation, userId, image };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('recipes').then((collection) => collection.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  exclude,
  updateImage,
};
