const { MongoClient } = require('mongodb');

// não esquecer de mudar a URL para o avaliador funcionar

// const MONGO_DB_URL = 'mongodb://mongodb:27017/CockMaster';

const MONGO_DB_URL = 'mongodb://localhost:27017/Cockmaster';
// const MONGO_DB_URL = 'mongodb://mongo:27017/Cockmaster';

const DB_NAME = 'Cockmaster';

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
