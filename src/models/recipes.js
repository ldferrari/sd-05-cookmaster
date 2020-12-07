const getCollection = require('./getCollection');

const getAll = async () =>
  getCollection('recipes').then((collection) => collection.find().toArray());

const create = async ({ name, ingredients, preparation, userId }) => {
  const recipe = await getCollection('recipes').then((collection) => collection.insertOne({ name, ingredients, preparation, userId }));
  return { name, ingredients, preparation, userId, _id: recipe.insertedId };
};

module.exports = {
  getAll,
  create,
};
