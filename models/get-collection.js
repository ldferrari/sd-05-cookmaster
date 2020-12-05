const { MongoClient } = require('mongodb');

require('dotenv').config({ path: 'variables.env' });

const DB_NAME = 'Cookmaster';
// SOMENTE PARA DESENVOLVIMENTO LOCAL
const MONGO_DB_URL = process.env.LOCAL_SERVER;
// SOMENTE PARA TESTE REMOTO NO GITHUB
// const MONGO_DB_URL = process.env.REMOTE_SERVER;

let connection;

const getCollection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }));
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getCollection;
