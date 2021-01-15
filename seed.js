db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

// const getCollection = require('./models/connection');

// // colocar query do MongoDB
// const createAdmin = () => {
//   admin = await getCollection('users')
//     .then((users) => users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }));

//   return admin;
// }

// createAdmin();

// module.exports = createAdmin;
