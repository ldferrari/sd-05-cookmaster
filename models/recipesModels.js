const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  getCollection('recipes')
    .then((newRecipe) => newRecipe.insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation, userId }));

const findAll = async () =>
  getCollection('recipes')
    .then((allRecipe) => allRecipe.find().toArray());

const findByID = async (recipeId) =>
  getCollection('recipes')
    .then((oneRecipe) => oneRecipe.findOne(ObjectId(recipeId)));

const upRecipe = async (id, name, ingredients, preparation, userId) => {
  if (ObjectId.isValid(id)) {
    getCollection('recipes')
      .then((newRecipe) => newRecipe.updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId } },
      ));
  }
  return { _id: ObjectId(id), name, ingredients, preparation, userId };
};

const deleteRecipe = async (recipeId) =>
  getCollection('recipes')
    .then((recipe) => recipe.deleteOne({ _id: ObjectId(recipeId) }));

const imageAdd = async (id) => {
  if (ObjectId.isValid(id)) {
    const imgPath = `localhost:3000/images/${id}.jpeg`;
    getCollection('recipes')
      .then((newRecipe) => newRecipe.updateOne(
        { _id: ObjectId(id) },
        { $set: { image: `${imgPath}` } },
      ));
  } else {
    return null;
  }
};

module.exports = {
  createRecipe,
  findAll,
  findByID,
  upRecipe,
  deleteRecipe,
  imageAdd,
};
