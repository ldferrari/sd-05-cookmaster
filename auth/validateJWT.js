const jwt = require('jsonwebtoken');
const models = require('../models');

const segredo = 'MinhaSenhaSuperComplexaTrybe2021';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing token' });
  }

  try {
    const decoded = jwt.verify(token, segredo);

    console.log(decoded, 'decoded');

    const user = await models.users.findByMail(decoded.userWithoutPassword.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.userId = decoded.userWithoutPassword.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
