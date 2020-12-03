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
    .then((products) => products.find().toArray());

const getById = async (id) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((products) => products.findOne(ObjectId(id)));

const updateById = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((products) =>
      products.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } })
    )
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

// const deleteById = async (id) =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((product) => product.findOneAndDelete({ _id: ObjectId(id) }))
//     .then((excludedProd) => excludedProd.value);

module.exports = { create, getAll, getById, updateById };
