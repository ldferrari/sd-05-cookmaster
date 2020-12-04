const mongodbConnection = require('./mongodbConnection');

const collectionName = 'users';

const checkEmail = async (email) => {
  const getCollection = await mongodbConnection(collectionName);
  return getCollection.findOne({ email });
};

const createUser = async (name, email, password) => {
  const getCollection = await mongodbConnection(collectionName);
  const newUser = await getCollection.insertOne({ name, email, password, role: 'user' });
  return { user: { name, email, role: 'user', _id: newUser.insertedId } };
};

module.exports = {
  checkEmail,
  createUser,
};
