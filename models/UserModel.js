const { ObjectId } = require('mongodb');
const connection = require('./connection');

/*  ********************************************************************************************* */
const objectDB = {
  "name" : "Erick Jacquin",
  "email" : "erickjacquin@gmail.com",
  "password" : "12345678",
  "role" : "user"
};

const createUserModel = async (name, email, password, role) =>
  connection('users')
    .then((user) => user.insertOne({ name, email, password, role }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

module.exports = {
  createUserModel,
};
