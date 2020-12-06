const connection = require('./connection');

async function createUser(name, email, password) {
  const insertUser = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password }));

  return { name, email, role: 'user', password, _id: insertUser.insertedId };
}

async function getUserByEmail(email) {
  const userEmail = await connection().then((db) => db.collection('users').findOne({ email }));
  return userEmail;
}

module.exports = { createUser, getUserByEmail };
