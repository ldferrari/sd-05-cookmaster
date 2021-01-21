const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = 'Cookmaster';
// const MONGO_DB_URL = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.jy0rn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

let connection = null;

const getConnection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collectionName);
};
module.exports = getConnection;
