const getCollection = require('./getCollection');

const create = async ({ name, ingredients, preparation, userID }) =>
  getCollection('recipes')
    .then((recipe) => recipe.insertOne({ name, ingredients, preparation, userID }))
    .then((result) => ({
      recipe: { name, ingredients, preparation, userID, _id: result.insertedId },
    }));

const getAll = async () => getCollection('recipes').then((result) => result.find().toArray());

module.exports = {
  create,
  getAll,
};
