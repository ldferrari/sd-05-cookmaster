const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getRecipe = async (email) =>
//   connection()
//     .then((db) => db.collection('recipes'))
//     .then((products) => products.findOne({ name }));

const create = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const getAll = async () =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.find().toArray());

const getById = async (id) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.findOne(ObjectId(id)));

const updateById = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) =>
      recipes.updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId } },
      ))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const deleteById = async (id) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.deleteOne({ _id: ObjectId(id) }));

module.exports = { create, getAll, getById, updateById, deleteById };
