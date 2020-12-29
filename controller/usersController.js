const { Router } = require('express');
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

module.exports = route;
