const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const getByEmail = async (email) =>
  connection()
    .then((db) => db.collection('users'))
    .then((products) => products.findOne({ email }));

const create = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }))
    .then((result) => ({ name, email, role: 'user', password, _id: result.insertedId }));

// const getAll = async () =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((products) => products.find().toArray());

// const getById = async (id) =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((products) => products.findOne(ObjectId(id)));

// const updateById = async (id, name, quantity) =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((products) => products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

// const deleteById = async (id) =>
//   connection()
//     .then((db) => db.collection('products'))
//     .then((product) => product.findOneAndDelete({ _id: ObjectId(id) }))
//     .then((excludedProd) => excludedProd.value);

// module.exports = { findProdByName, create, getAll, getById, updateById, deleteById };
module.exports = { getByEmail, create };
