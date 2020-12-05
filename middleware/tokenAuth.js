const jwt = require('jsonwebtoken');
const model = require('../model/usersModel');

const secret = 'thebeatlesÉsuperestimado';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (!token) {
    return res.status(400).json({ erro: 'token nào foi informado' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await model.getById(decoded);
    console.log(user)
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
