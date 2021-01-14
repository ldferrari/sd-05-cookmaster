const jwt = require('jsonwebtoken');
const um = require('../models/usersModel');

const recipesValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  if (name === undefined || ingredients === undefined || preparation === undefined) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  try {
    const decode = await jwt.verify(authorization, 'batata');
    const findUser = await um.findByEmail(decode.data.email);
    if (findUser === null) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  next();
};

module.exports = { recipesValidation };
