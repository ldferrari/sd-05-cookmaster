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

module.exports = {
  verifyNewUser,
};
