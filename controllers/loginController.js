const { Router } = require('express');
const userModels = require('../models/usersModels');
const createJWT = require('../service/createJWT');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    const userFound = await userModels.findByEmail(email);
    if (!userFound || userFound.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    const tokenOn = createJWT(userFound);
    return res.status(200).json({ token: tokenOn });
  } catch (err) {
    return res.status(500).json({ messade: 'Algo deu errado no login' });
  }
});

module.exports = loginRouter;
