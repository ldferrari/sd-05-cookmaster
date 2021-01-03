const { MongoClient } = require('mongodb');

const MONGO_DB_URL_LOCAL = 'mongodb://mongodb:27017/Cookmaster';
// const MONGO_DB_URL_LOCAL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db(DB_NAME))
    .catch((err) => {
      console.log(err);
    });

module.exports = connection;
