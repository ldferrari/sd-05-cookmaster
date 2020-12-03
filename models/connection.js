const mongo = require('mongodb').MongoClient;

// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; - para o avaliador

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; // pop
const DB_NAME = 'StoreManager';

const connection = () => {
  return mongo
    .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( connected => connected.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connection;
