const connection = require('./connection');

const theCollection = 'users';

const create = async (name, email, password) => {
  const insert = await connection().then((db) => db.collection(theCollection).insertOne({ name, email, password, role: 'admin' }));
  return insert.ops[0];
};

module.exports = {
  create,
};
