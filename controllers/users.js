/* eslint-disable */
const { Router } = require('express');

const services = require('../services/users');

const auth = require('../middleware/auth');

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
    if (error.err.code === 'invalid_entries') return res.status(400).json(error);
    if (error.err.code === 'email_used') return res.status(409).json(error);
    console.error(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});
/* 2- LOGIN */

usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await services.login( email, password);
    return res.status(200).json(token);
  } catch (error) {
    if (error.err.code === 'invalid_data') return res.status(401).json(error);
    if (error.err.code === 'email_used') return res.status(409).json(error);
    console.error(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

usersRouter.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('id no controller => ', id);
    const products = await services.getProduct(id);
    res.status(200).json(products);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

usersRouter.put('/users/:id', auth, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updated = await services.update(id, name, quantity);
    res.status(200).json(updated);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});

usersRouter.delete('/users/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await services.remove(id);
    res.status(200).json(deleted);
  } catch (error) {
    if (error.err.code === 'invalid_data') {
      return res.status(422).json(error);
    }
    res.status(500).json({ message: 'Deu ruim' });
  }
});


usersRouter.post('/users/', auth, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await services.create(name, email, password);
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.err.code === 'invalid_entries') return res.status(400).json(error);
    if (error.err.code === 'email_used') return res.status(409).json(error);
    console.error(error);
    res.status(500).json({ message: 'Deu ruim no POST' });
  }
});

module.exports = usersRouter;
