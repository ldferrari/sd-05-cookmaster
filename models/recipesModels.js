const getCollection = require('./get-collection');

const create = (name, ingredients, preparation) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation }))
    .then((res) => ({ recipe: { _id: res.insertedId, name, ingredients, preparation } }));

const findByName = (name) => getCollection('recipes').then((recipes) => recipes.findOne({ name }));

const getAll = () => getCollection('recipes').then((recipes) => recipes.find().toArray());

module.exports = {
  create,
  findByName,
  getAll,
};
