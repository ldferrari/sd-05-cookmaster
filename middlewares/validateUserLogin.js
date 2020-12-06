const rescue = require('express-rescue');
const { getUserbyEmail } = require('../models/usersModels');
const checkEmail = require('./emailValidation');

module.exports = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserbyEmail(email);

  if (!email || !password) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  if (!checkEmail(email)) {
    return res.status(401).json({ message: 'Incorret username or password' });
  }

  if (user && password !== user.password) {
    return res.status(401).json({
      message: 'Incorret username or password',
    });
  }

  next();
});
