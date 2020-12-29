/* eslint-disable no-alert, no-console */
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection('users').then((db) => db.find().toArray());

const getById = async (id) => connection('users').then((db) => db.findOne(ObjectId(id)));

const getByEmail = async (email) => connection('users').then((db) => db.findOne({ email }));

const createUser = async (name, email, password, role) =>
  connection('users')
    .then((db) => db.insertOne({ name, email, password, role }))
    .then((result) => ({ user: { _id: result.insertedId, name, email, role } }));

const updateUser = async (id, name, email, password, role) => {
  connection('users').then((db) =>
    db.updateOne({ _id: ObjectId(id) }, { $set: { name, email, password, role } }));

  return { user: { _id: id, name, email, password, role } };
};

const deleteUser = async (id) =>
  connection('users').then((db) => db.deleteOne({ _id: ObjectId(id) }));

module.exports = { getAll, createUser, getById, updateUser, deleteUser, getByEmail };
