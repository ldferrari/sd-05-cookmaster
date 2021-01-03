const connection = require('./connection');

const insertUser = async (name, password, email, role = 'user') => {
  const db = await connection();
  const result = await db
    .collection('users')
    .insertOne({ name, email, password, role })
    .then((answer) => ({
      id: answer.insertedId,
      name,
      email,
      role,
    }));
  return result;
};

const existsUser = async (email) => {
  const db = await connection();
  const result = await db
    .collection('users')
    .findOne({ email });

  return result;
};

module.exports = {
  insertUser,
  existsUser,
};
