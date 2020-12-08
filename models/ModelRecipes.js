const getCollection = require('./get-collection');

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const db = await getCollection('recipes');
  const result = await db.insertOne({
    recipe: { name, ingredients, preparation, userId },
  });
  return result.ops[0];
};

module.exports = addNewRecipe;
