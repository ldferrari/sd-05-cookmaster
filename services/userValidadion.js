const um = require('../models/usersModel');

const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

const userValidate = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (name === undefined || email === undefined || password === undefined) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const validateEmail = validEmail.test(email);
  if (!validateEmail) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const findEmail = await um.findByEmail(email);
  console.log(findEmail);
  if (findEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = { userValidate };
