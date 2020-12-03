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

module.exports = { addRecipe, getAllRecipes };
