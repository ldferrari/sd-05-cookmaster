const connection = require('../middleware/connection');

async function createUser(name, email, password) {
  const insertUser = await connection('users').then((db) =>
    db.insertOne({ name, email, password }));
  return { name, email, role: 'user', password, _id: insertUser.insertedId };
}

async function getUserByEmail(emailToFind) {
  const userEmail = await connection('users').then((db) => db.findOne({ email: emailToFind }));
  return userEmail;
}

module.exports = { createUser, getUserByEmail };
