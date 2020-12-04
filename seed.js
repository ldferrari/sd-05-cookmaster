// colocar query do MongoDB
// { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }
const getCollection = require('./models/connection');

getCollection('users').then((users) => 
  users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }));
