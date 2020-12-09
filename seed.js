// colocar query do MongoDB
const connection = require('./model/connection')

const createAdmin = () => {
    connection('users')
    .then((users) => users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }))
    .then((result) => ({ _id: result.insertedId, name, email, role: 'admin' }));
}

module.exports = createAdmin;