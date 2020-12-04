const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await getCollection('recipes').then((recipes) => recipes.insertOne({ name, ingredients, preparation, userId }));
  // console.log(newUser);
  return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

const getAll = async () =>
  getCollection('recipes').then((recipes) => recipes.find().toArray());

const getById = async (id) => getCollection('recipes')
  .then((recipes) => recipes.findOne(ObjectId(id)));

// const updateSales = async (id, productId, quantity) => {
//   const sale = await getCollection('sales')
//     .then((sales) => sales.updateOne(
//       { _id: ObjectId(id), 'itensSold.productId': productId },
//       { $set: { 'intensSold[0].quantity': quantity } },
//     ));

//   return sale;
// };

// const excludeSales = async (id) => {
//   const deleted = await getCollection('sales')
//     .then((db) => db.deleteOne({ _id: ObjectId(id) }));
//   // console.log(deleted);
//   return deleted;
// };

module.exports = {
  getAll,
  getById,
  // getUserByEmail,
  create,
  // updateSales,
  // excludeSales,
};
