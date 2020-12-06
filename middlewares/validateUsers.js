const rescue = require('express-rescue');
const { getUserbyEmail } = require('../models/usersModels');

module.exports = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await getUserbyEmail(email);

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  if (user && email === user.email) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }
  next();
});
