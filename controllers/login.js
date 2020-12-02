const express = require('express');
const rescue = require('express-rescue');
const { validateLogin } = require('../middlewares/index');
const { createToken, findEmail } = require('../models');

const loginController = express.Router();

loginController.post('/', validateLogin, rescue(async (req, res) => {
  const { email } = req.body;
  const payload = await findEmail(email);
  const { password, ...payloadWithoutPass } = payload;
  const token = createToken(payloadWithoutPass);

  res.status(200).json({ token });
}));

module.exports = loginController;
