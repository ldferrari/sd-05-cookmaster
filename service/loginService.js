const jwt = require('jsonwebtoken');
const { existsUser } = require('../model').users;

const userExists = async (email, password) => {
  if (!email || !password) {
    return { message: 'All fields must be filled' };
  }

  const user = await existsUser(email);

  if (user === null || user.password !== password) {
    return { message: 'Incorrect username or password' };
  }

  // eslint-disable-next-line dot-notation
  const { password: _, ...userWithoutPassword } = user;
  const { _id: id } = userWithoutPassword;
  const payload = {
    sub: id,
    data: userWithoutPassword,
  };

  const token = jwt.sign(payload, 'minha frase secreta', {
    expiresIn: 3000,
    algorithm: 'HS256',
  });

  return { auth: true, token };
};

module.exports = {
  userExists,
};
