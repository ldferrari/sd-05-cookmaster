const { MongoClient } = require('mongodb');
require('dotenv/config');

const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = process.env.LOCAL_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

let connection;

const getCollection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getCollection;
