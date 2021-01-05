const { findEmail } = require('../models/users');

const verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  // [Será validado que o campo "email" e "password" são obrigatórios]
  if (!email || !password) {
    res.status(401).json({ message: 'All fields must be filled' });
  }
  // [Será validado que não é possível fazer login com um email inválido]
  if (!regex.test(email)) {
    res.status(401).json({ message: 'Incorrect username or password' });
  }
  // [Será validado que não é possível fazer login com uma senha inválida]
  const registeredUser = await findEmail(email);

  if (!registeredUser || registeredUser.password !== password) {
    res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = { verifyLogin };
