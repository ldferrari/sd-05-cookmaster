const connection = require('./connection');

const theCollection = 'users';

const getByEmail = async (email) => connection()
  .then((db) => db.collection(theCollection).findOne({ email: { $in: [email] } }));

const create = async (name, email, password) => {
  const insert = await connection().then((db) => db.collection(theCollection).insertOne({ name, email, password, role: 'user' }));
  return insert.ops[0];
};

module.exports = {
  create,
  getByEmail,
};
