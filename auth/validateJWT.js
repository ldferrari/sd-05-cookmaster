const jwt = require('jsonwebtoken');
const models = require('../models');

const segredo = 'MinhaSenhaSuperComplexaTrybe2021';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, segredo);

    const user = await models.users.findByMail(decoded.userWithoutPassword.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = decoded.userWithoutPassword;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
