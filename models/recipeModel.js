const { ObjectID } = require('mongodb');
const getCollection = require('./getCollection');

const addRecipe = async (name, ingredients, preparation) => {
  console.log('.');
  return getCollection('recipes')
    .then((recipes) => recipes.insertOne({ name, ingredients, preparation }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
    }));
};

const getAllRecipes = async () =>
  getCollection('recipes').then((recipes) => recipes.find().toArray());

const getRecipeById = async (id) =>
  getCollection('recipes').then((recipes) => recipes.findOne(ObjectID(id)));

const update = async (id, name, ingredients, preparation) =>
  getCollection('recipes').then((recipes) =>
    recipes.updateOne(
      { _id: ObjectID(id) },
      { $set: { name, ingredients, preparation } },
    ));

const updatedWithImage = (id) =>
  getCollection('recipes').then((recipes) =>
    recipes.updateOne(
      { _id: ObjectID(id) },
      { $set: { image: `localhost:3000/images/${id}.jpeg` } },
    ));

const exclude = async (id) =>
  getCollection('recipes').then((recipes) =>
    recipes.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  update,
  exclude,
  updatedWithImage,
};
