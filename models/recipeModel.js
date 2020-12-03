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

module.exports = { addRecipe };
