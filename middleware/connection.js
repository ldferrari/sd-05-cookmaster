const { MongoClient } = require('mongodb');

const { DB_NAME, MONGO_DB_URL } = process.env;

let connection;

const getConnection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getConnection;
