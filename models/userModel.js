// const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

// const getAllSales = async () =>
//   getCollection('sales').then((sales) => sales.find().toArray());


const create = async (email, password, name, role) => {
  const user = await getCollection('users').then((db) => db.insertOne({ email, password, name, role }));
  return { _id: sale.insertedId, name, email, password, role };
};

const getUserByEmail = async (email) => getCollection('users')
   .then((db) => db.findOne(email));

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
  //getAllSales,
  getUserByEmail,
  create,
  //updateSales,
  //excludeSales,
};