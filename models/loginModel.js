const mongodbConnection = require('./mongodbConnection');

const collectionName = 'users';
const verifyUser = async (email, password) => {
  const getCollection = await mongodbConnection(collectionName);
  const user = await getCollection.findOne({ email, password });
  if (!user) return null;
  const { _id: id } = user;
  return id;
};

module.exports = {
  verifyUser,
};
