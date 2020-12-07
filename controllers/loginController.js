const { Router } = require('express');
const jwt = require('jsonwebtoken');
const userModels = require('../models/usersModels');

const loginRouter = Router();
const secret = 'é segredo';
const jwtConfig = {
  expiresIn: '15m', // tempo para o token inspirar
  algorithm: 'HS256', // algorítimo assimétrico (algotítimo padrão, não necessário colocar)
};

loginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await userModels.findByEmail(email);
    console.log(email);

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    if (!userFound || userFound.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const payload = {
      iss: 'post-api', // issuer -> quem emitiu o token
      aud: 'post-api', // Audience -> quem deve aceitar o token
      sub: userFound.id, // Suject -> A quem pertence esse token
      useData: userFound,
    };
    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ messade: 'Algo deu errado no login' });
  }
});

module.exports = loginRouter;
