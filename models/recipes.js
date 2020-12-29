const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection('recipes').then((db) => db.find().toArray());

const getById = async (id) => connection('recipes').then((db) => db.findOne(ObjectId(id)));

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection('recipes')
    .then((db) => db.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);

const updateRecipe = async (id, name, ingredients, preparation, userId) => {
  connection('recipes').then((db) =>
    db.updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } }));
  return { _id: id, name, ingredients, preparation, userId };
};

const updateRecipePhoto = async (id, image) =>
  connection('recipes')
    .then((db) => db.updateOne({ _id: ObjectId(id) }, { $set: { image } }))
    .then((recipe) => ({ recipe }));

const deleteRecipe = async (id) =>
  connection('recipes').then((db) => db.deleteOne({ _id: ObjectId(id) }));

module.exports = { getAll, createRecipe, getById, updateRecipe, deleteRecipe, updateRecipePhoto };
