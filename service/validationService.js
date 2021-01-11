const userModel = require('../model/userModel');

const validateNewUser = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const user = userModel.getUserByEmail(email);
  console.log(user);
  // if (user) res.status(409).json({ message: 'Email already registered' });
};

module.exports = { validateNewUser };
