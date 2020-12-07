const { MongoClient } = require('mongodb');
require('dotenv').config();

// não esquecer de mudar a URL para o avaliador funcionar
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const MONGO_DB_URL = 'mongodb://mongo:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const connection = (collectionName) => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then((connect) => connect.db(DB_NAME).collection(collectionName))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
