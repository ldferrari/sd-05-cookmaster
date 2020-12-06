const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = 'Cookmaster';
const DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;
const CONNECTION_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };

let connection = null;
const CLIENT = new MongoClient(DB_URL, CONNECTION_OPTIONS);

module.exports = async (collectionName) => {
  try {
    connection = connection || await CLIENT.connect();
    return connection.db(DB_NAME).collection(collectionName);
  } catch (error) {
    console.error(error.message);
    // await CLIENT.close();
  }
};
