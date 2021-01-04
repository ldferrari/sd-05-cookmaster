const { Router } = require('express');

const service = require('../service/usersService');
const validateJWT = require('../auth/validateJWS');

const route = Router();

route.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await service.create(name, email, password);
  if (newUser.error) {
    if (newUser.code === 'invalid_entries') {
      return res.status(400).json({ message: newUser.message });
    }
    if (newUser.code === 'email_in_use') {
      return res.status(409).json({ message: newUser.message });
    }
  }
  return res.status(201).json(newUser);
});

route.post('/admin', validateJWT, async (req, res) => {
  const { name, password, email } = req.body;
  let checkRole = 'user';
  if (req.user) {
    checkRole = req.user.role;
  }
  if (checkRole !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const newAdmin = await service.create(name, email, password, checkRole);

  if (newAdmin.error) {
    if (newAdmin.code === 'invalid_Entries') {
      return res.status(400).json({ message: newAdmin.message });
    }
    return res.status(409).json({ message: newAdmin.message });
  }
  console.log(newAdmin);
  return res.status(201).json(newAdmin);
});
module.exports = route;
