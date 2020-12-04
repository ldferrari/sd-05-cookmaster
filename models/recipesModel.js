const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const getAll = async () =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.findOne(ObjectId(id)));
};

const updateById = async (id, name, ingredients, preparation, userId) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) =>
      recipes.updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId } },
      ))
    .then((_result) => ({ _id: ObjectId(id), name, ingredients, preparation, userId }));
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.deleteOne({ _id: ObjectId(id) }));
};

const updateImage = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const imgPath = `localhost:3000/images/${id}.jpeg`;
  return connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) =>
      recipes.updateOne(
        { _id: ObjectId(id) },
        { $set: { image: `${imgPath}` } },
      ));
};

module.exports = { create, getAll, getById, updateById, deleteById, updateImage };
