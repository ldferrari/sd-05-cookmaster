const getCollection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await getCollection('recipes').then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));
  // console.log(newUser);
  return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

module.exports = {
  // getAllSales,
  // getUserByEmail,
  create,
  // updateSales,
  // excludeSales,
};
