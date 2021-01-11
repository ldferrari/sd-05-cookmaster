const userModel = require('../model/userModel');

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email) ? false : true;
};

const validateNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const user = await userModel.getUserByEmail(email);
  if (user.email === email) {
    res.status(409).json({ message: 'Email already registered' });
  }
};

const validateLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(401).json({ message: 'All fields must be filled' });
  if (!validateEmail || password.length < 5) res.status(401).json({ message: 'Incorrect username or password' });
};

module.exports = { validateNewUser, validateLogin };
