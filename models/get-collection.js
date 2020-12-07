const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'Cookmaster';
const URI = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

let connection = null;

// prettier-ignore
const getCollection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(URI, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getCollection;
