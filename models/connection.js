const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
const PARAMS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => MongoClient.connect(MONGO_DB_URL, PARAMS)
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
