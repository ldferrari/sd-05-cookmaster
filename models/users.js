const connection = require('./connection');

const addUser = async ({ name, email, password }, role) => {
  const db = await connection('users');
  const result = await db.insertOne({ name, email, password, role });

  return result.ops[0];
};

const findEmail = async (email) => {
  const db = await connection('users');
  const result = await db.findOne({ email });

  return result;
};

module.exports = {
  addUser,
  findEmail,
};
