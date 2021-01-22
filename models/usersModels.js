const getCollection = require('./connection');

const createUser = async (name, email, password) =>
  getCollection('users')
    .then((newUser) => newUser.insertOne({ name, email, password, role: 'user' }))
    .then((result) => ({ _id: result.insertedId, name, email, password, role: 'user' }));

const findByEmail = async (email) => {
  const result = await getCollection('users')
    .then((AllUsers) => AllUsers.findOne({ email }));
  return result;
};

module.exports = {
  createUser,
  findByEmail,
};
