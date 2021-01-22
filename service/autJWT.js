const jwt = require('jsonwebtoken');
const usersModels = require('../models/usersModels');

const funAuthorization = (async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const secret = 'segredo';
    const payload = jwt.verify(auth, secret);
    const user = await usersModels.findByEmail(payload.useData.email);
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

module.exports = funAuthorization;
