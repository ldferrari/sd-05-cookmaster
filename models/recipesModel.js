const { ObjectId } = require('mongodb');

const cookMasterCollection = require('./connection');

const create = async (name, ingredients, preparation, userId) =>
  cookMasterCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const getAll = async () =>
  cookMasterCollection('recipes')
    .then((recipe) => recipe.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return cookMasterCollection('recipes')
    .then((recipe) => recipe.findOne({_id: ObjectId(id)}));
};

module.exports = {
  create,
  getAll,
  getById,
};
