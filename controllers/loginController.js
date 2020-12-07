const { Router } = require('express');
// const usersService = require('../service/usersService');
const userBD = require('../models/usersModels');
// const rescue = require('express-rescue');

const loginRouter = Router();

/* const crypto = require('crypto-js'); // Gerador de tokens
const { MD5 } = crypto;
const token = MD5().toString().substr(0, 16);
 */
loginRouter.get('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await userBD.findByEmail(email);
    console.log(email);

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    if (!userFound || userFound.password !== password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    return res.status(200).json('token');
  } catch {
    return res.status(500).json({ messade: 'Algo deu errado no login' });
  }
});

module.exports = loginRouter;
