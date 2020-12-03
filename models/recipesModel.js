const { ObjectId } = require('mongodb');
const connection = require('./connection');

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

const getById = async (id) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((products) => products.findOne(ObjectId(id)));

module.exports = { create, getAll, getById };
