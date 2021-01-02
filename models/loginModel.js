const getCollection = require('./getCollection');

const checkEmail = async (email) => getCollection('users').then((user) => user.findOne({ email }));

module.exports = {
  checkEmail,
};
