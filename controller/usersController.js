const { Router } = require('express');
const hasToken = require('../middleware/hasToken');
const userServices = require('../service').users;

const route = Router();

route.post('/', async (req, res) => {
  const { name, password, email } = req.body;
  const result = await userServices.insertUserService(name, email, password);

  if (result.message) {
    if (result.code === 'invalidEntries') {
      return res.status(400).json({ message: result.message });
    }
    return res.status(409).json({ message: result.message });
  }

  return res.status(201).json({ user: result });
});

route.post('/admin', hasToken, async (req, res) => {
  const { name, password, email } = req.body;
  let role = 'user';
  if (req.user) {
    role = req.user.data.role;
  }
  if (role !== 'admin') {
    return res.status(403).json({
      message: 'Only admins can register new admins',
    });
  }

  const result = await userServices.insertUserService(
    name,
    email,
    password,
    role,
  );

  if (result.message) {
    if (result.code === 'invalidEntries') {
      return res.status(400).json({ message: result.message });
    }
    return res.status(409).json({ message: result.message });
  }

  return res.status(201).json({ user: result });
});

module.exports = route;
