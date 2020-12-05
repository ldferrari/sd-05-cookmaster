// Referência:
// https://github.com/tryber/sd-05-live-lectures/blob/models-and-db/models/mongodbConnection.js

const { MongoClient } = require('mongodb');

let connection = null;

const DB_NAME = 'Cookmaster';
// const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;
const MONGO_DB_URL = `mongodb://mongodb:27017/${DB_NAME}`;

module.exports = async (collectionName) => {
  connection = connection
  || (await MongoClient.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }));

  return connection.db(DB_NAME).collection(collectionName);
};
