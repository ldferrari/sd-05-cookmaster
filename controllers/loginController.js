const { Router } = require('express');
const rescue = require('express-rescue');
const createToken = require('../models/createToken');
const { hasEmail } = require('../models/ModelUser');
const { login } = require('../middlewares');

const loginRoute = Router();

loginRoute.post('/', login, rescue(async (req, res) => {
  const { email } = req.body;
  const userLogged = await hasEmail(email);
  const token = await createToken(userLogged);

  return res.status(200).json({ token });
}));

module.exports = loginRoute;
