const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let connection;

const getConnection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }));

  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getConnection;
