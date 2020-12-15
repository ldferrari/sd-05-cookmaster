const getCollection = require('./connection.models');

const { TABLES } = require('../enumerators/databaseEnums');

const registerUser = async (name, email, password, role) => {
  const newUser = await getCollection(TABLES.users)
    .then((db) =>
      db.insertOne({
        name,
        email,
        password,
        role,
      }))
    .then((result) => ({ _id: result.insertedId, name, email, role }));
  return newUser;
};

const findBy = async (attributeToFind) => {
  const result = await getCollection(TABLES.users)
    .then((db) => db.findOne(attributeToFind));
  return result;
};

module.exports = { registerUser, findBy };
