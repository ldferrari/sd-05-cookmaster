const { Db } = require('mongodb');

// colocar query do MongoDB
const {} = require('mongodb');
require('dotenv/config');


const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = process.env.LOCAL_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;

let connection;
const addAdmin = async () => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
}
 
addAdmin();