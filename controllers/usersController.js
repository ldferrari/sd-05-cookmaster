const { Router } = require('express');
const usersService = require('../service/usersService');

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const user = req.body;
  try {
    const newUser = await usersService.createUser(user);

    if (newUser.err) {
      return res.status(newUser.statusCode).json({ message: newUser.message });
    }
    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = userRouter;
