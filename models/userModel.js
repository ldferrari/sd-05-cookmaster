// const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

// const getAllSales = async () =>
//   getCollection('sales').then((sales) => sales.find().toArray());

const create = async (email, password, name, role) => {
  const newUser = await getCollection('users').then((users) => users.insertOne({ email, password, name, role }));
  // console.log(newUser);
  return { name, email, role, _id: newUser.insertedId };
};

const getUserByEmail = async (email) => getCollection('users')
  .then((users) => users.findOne({ email }));

const getUserByName = async (username) =>
  getCollection('users').then((db) => db.findOne({ username }));

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
  // getAllSales,
  getUserByEmail,
  getUserByName,
  create,
  // updateSales,
  // excludeSales,
};
