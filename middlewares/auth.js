const jwt = require('jsonwebtoken');

const model = require('../models');

const secret = 'limpa_o_fogon';

const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const user = await model.users.findByEmail(decoded.userData.email);

    if (!token || !user) {
      return res.status(401).json({ message: 'invalid token or user not found' });
    }

    req.user = decoded.userData;
    next();
  } catch (err) {
    console.log('Erro: ', err.message);
    if (err.message === 'jwt malformed') {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    res.status(401).json({ message: 'missing auth token' });
  }
};

module.exports = { authToken };
