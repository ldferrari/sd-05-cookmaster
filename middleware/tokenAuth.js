const jwt = require('jsonwebtoken');
// const model = require('../model/usersModel');

const secret = 'thebeatlesÉsuperestimado';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const { data: { _id, role } } = decoded;
    console.log(_id);
    req.userID = _id;
    req.role = role;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
