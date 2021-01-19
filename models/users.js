const connection = require('./connection');

// [Será validado que é possível ao cadastrar usuário, o valor do campo "role" tenha o valor "user"]
const createUser = async (infos, role) => {
  const { name, email, password } = infos;
  const db = await connection('users');
  const result = await db
    .insertOne({ name, email, password, role })
    .then((response) => ({
      id: response.insertedId,
      name,
      email,
      role,
    }));

  return result;
};

const findEmail = async (email) => {
  const db = await connection('users');
  const result = await db.findOne({ email });

  return result;
};

module.exports = { createUser, findEmail };
