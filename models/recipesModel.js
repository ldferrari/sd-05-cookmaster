const connection = require('./connection');
// const { ObjectId } = require('mongodb');

// const getRecipe = async (email) =>
//   connection()
//     .then((db) => db.collection('recipes'))
//     .then((products) => products.findOne({ name }));

const create = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const getAll = async () =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((products) => products.find().toArray());

module.exports = { create, getAll };
