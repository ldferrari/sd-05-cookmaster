const { Router } = require('express');
const jwt = require('jsonwebtoken');

const loginRouter = Router();

const usersServices = require('../services/usersServices');
// const usersModel = require('../models/usersModel');

// 2 - Crie um endpoint para o login de usuários
loginRouter.post('/', async (req, res) => {
  const secret = 'secret-stuff-here-what?';
  const { email, password } = req.body;
  try {
    // Validar os dados do login no service
    const validUser = await usersServices.login(email, password);
    if (!validUser) return res.status(400).json({ message: 'Login was not possible' });
    // Configurar e retornar o JWT
    // 1/ Header
    const jwtConfig = {
      expiresIn: 60,
      algorithm: 'HS256',
    };
    // 2/ Payload
    const payload = {
      data: validUser,
      // other data here?
    };
    // 3/ Assinatura
    const token = jwt.sign(payload, secret, jwtConfig);
    // 4/ Devolver token ao usuário
    return res.status(200).json({ token });
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(401).json({ message: err.message });
    }
    if (err.code === 'unauthorized') {
      return res.status(401).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Aaah internal error' });
  }
});

module.exports = loginRouter;
