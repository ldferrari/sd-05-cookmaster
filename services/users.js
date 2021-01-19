const jwt = require('jsonwebtoken');

const { findEmail } = require('../models/users');

const verifyNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  // [Será validado que o campo "name", "email" e "senha" são obrigatórios]
  // [Será validado que não é possível cadastrar usuário com o campo email inválido]
  if (!name || !password || !email || !regex.test(email)) {
    return res.status(400).json({
      code: 'invalidEntries',
      message: 'Invalid entries. Try again.',
    });
  }

  // [Será validado que o campo "email" é único]
  const existentUser = await findEmail(email);
  if (existentUser) {
    return res.status(409).json({
      code: 'emailExists',
      message: 'Email already registered',
    });
  }

  next();
};

const secret = 'segredosecreto';

const verifyNewAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = jwt.verify(authorization, secret);
  // verificado o objeto retornado com console.log(decoded);
  const user = await findEmail(decoded.userData.email);

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  // se passou na verificação (ou seja, é um admin) retorna pro objeto req
  // apenas as informações necessárias para cadastrar usuário:
  const { password, ...userWithoutPassword } = user;
  req.user = userWithoutPassword;

  return next();
};

module.exports = { verifyNewUser, verifyNewAdmin };
