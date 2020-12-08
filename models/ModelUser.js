const getCollection = require('./get-collection');

const addUser = async (name, email, password, role = 'user') => {
  const db = await getCollection('users');
  const result = await db.insertOne({
    user: { name, email, password, role },
  });

  return result.ops[0];
};

const hasEmail = async (email) => {
  const db = await getCollection('users');
  const result = await db.findOne({ 'user.email': email });

  return result;
};

module.exports = {
  addUser,
  hasEmail,
};
