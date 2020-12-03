const { Router } = require('express');
const jwt = require('jsonwebtoken');

const loginRouter = Router();

const usersServices = require('../services/usersServices');

// 2 - Crie um endpoint para o login de usuários
loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    // I - Validar os dados do login
    const user = await usersServices.login(email, password);
    if (!user) return res.status(400).json({ message: 'Login was not possible' });
    console.log(user);
    // Refatorar: melhorar fazer uma fction que gera o token com params
    // II - Configurar e retornar o JWT
    // 1/ Secret
    const secret = 'secret-stuff-here-what?';
    // 2/ Header
    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    // 3/ Payload
    // First taking away sensible data
    const { password: _, ...userWithoutPassword } = user;
    const { _id: id } = userWithoutPassword;
    const payload = {
      sub: id,
      userData: userWithoutPassword,
    };
    // 4/ Assinatura
    const token = jwt.sign(payload, secret, jwtConfig);
    // 5/ Devolver token ao usuário
    return res.status(200).json({ token });
  } catch (err) {
    if (err.code === 'invalid_user') {
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
