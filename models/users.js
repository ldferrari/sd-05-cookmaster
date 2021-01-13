const getCollection = require('./connection');

const create = async (name, email, password, role) => {
  const createUser = await getCollection('users')
    .then((users) => users.insertOne({ name, email, password, role }));

  return { _id: createUser.insertedId, name, email, password, role };
};

const findByMail = async (email) => {
  const db = await getCollection('users');
  const result = await db.findOne({ email });

  return result;
};

module.exports = {
  create,
  findByMail,
};
