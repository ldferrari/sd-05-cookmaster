const usersModel = require('../models/usersModel');

const isValid = async (name, email, password) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = regex.test(String(email).toLowerCase());
  const emailExistente = await usersModel.getEmail({ email });

  if (!name || !email || !password) {
    return {
      error: true,
      statusCode: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  if (!validEmail) {
    return {
      error: true,
      statusCode: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  if (emailExistente) {
    return {
      error: true,
      statusCode: 409,
      message: 'Email already registered',
    };
  }
  return { error: false };
};

const create = async (name, email, password) => {
  const verificaUser = await isValid(name, email, password);
  if (verificaUser.error) {
    return verificaUser;
  }
  const novoUsuario = await usersModel.create(name, email, password);
  return {
    user: novoUsuario,
  };
};

module.exports = { create };
