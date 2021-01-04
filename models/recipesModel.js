const { ObjectId } = require('mongodb');
const getCollection = require('./getCollection');

const create = async ({ name, ingredients, preparation }, userId) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({
      recipe: { name, ingredients, preparation, userId, _id: result.insertedId },
    }));

const getAll = async () => getCollection('recipes').then((result) => result.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('recipes').then((recipe) => recipe.findOne(ObjectId(id)));
};
const update = async (id, recipe, userId) => {
  const { name, ingredients, preparation } = recipe;
  if (!ObjectId.isValid(id)) return null;
  const recipes = await getCollection('recipes')
    .then((aux) => aux.updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } }))
    .then((result) => (
      { name, ingredients, preparation, userId, _id: result.insertedId }));
  return recipes;
};
const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const deleteP = await getCollection('recipes').then((recipe) =>
    recipe.deleteOne({ _id: ObjectId(id) }));
  return deleteP;
};

const updateImg = async (id) => {
  const img = `localhost:3000/images/${id}.jpeg`;
  getCollection('recipes')
    .then((aux) => aux.updateOne({ _id: ObjectId(id) }, { $set: { image: img } }));
  return getCollection('recipes').then((recipe) => recipe.findOne(ObjectId(id)));
};
module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
  updateImg,
};
