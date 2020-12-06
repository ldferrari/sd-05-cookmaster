const { Router } = require('express');
const rescue = require('express-rescue');
const createToken = require('../models/createToken');
const { hasEmail } = require('../models/ModelUser');
const { login } = require('../middlewares');

const loginRoute = Router();

loginRoute.post('/', login, rescue(async (req, res) => {
  const { email } = req.body;
  const payload = await hasEmail(email);
  const { password: _, ...payloadWithoutPassword } = payload;
  const token = createToken(payloadWithoutPassword);

  return res.status(200).json({ token });
}));

module.exports = loginRoute;
