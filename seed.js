// colocar query do MongoDB
// const getCollection = require('./models/connection');

// getCollection('users').then((users) => 
//   users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }));

db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
