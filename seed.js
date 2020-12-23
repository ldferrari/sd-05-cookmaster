// colocar query do MongoDB
const connection = require('./models/connection');

connection('users').then((db) =>
  db.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' })
);
