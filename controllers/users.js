const { Router } = require('express');

const services = require('../services/users');

const auth = require('../middleware/auth');
const userFields = require('../middleware/userFields');

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await services.getAll();
  res.status(200).json({ users });
});

/*  1 -- criando users */
usersRouter.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await services.create(name, email, password);
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 'invalid_entries') return res.status(400).json(error);
    if (error.code === 'email_used') return res.status(409).json(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});
/* 2- LOGIN */

usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await services.login(email, password);
    return res.status(200).json(token);
  } catch (error) {
    if (error.code === 'invalid_data') return res.status(401).json(error);
    if (error.code === 'email_used') return res.status(409).json(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});
/*  1 -- criando users */
usersRouter.post('/users/admin', auth, userFields, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.payload;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    const newUser = await services.create(name, email, password, 'admin');
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 'invalid_entries') return res.status(400).json(error);
    if (error.code === 'email_used') return res.status(409).json(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

module.exports = usersRouter;
