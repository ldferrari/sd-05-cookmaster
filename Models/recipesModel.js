const { ObjectId } = require('mongodb');

const getCollection = require('./get-connection');

const create = async (name, ingredients, preparation, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const getAll = async () => getCollection('recipes').then((recipe) => recipe.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('recipes').then((recipe) => recipe.findOne({ _id: ObjectId(id) }));
};

const update = async (id, name, ingredients, preparation, userId) => {
  if (!ObjectId.isValid(id)) return null;
  getCollection('recipes').then((recipe) =>
    recipe.updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId } }));
  return { _id: id, name, ingredients, preparation, userId };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('recipes').then((db) => db.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
