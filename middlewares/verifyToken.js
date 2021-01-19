const jwt = require('jsonwebtoken');
const { findEmail } = require('../models/users');

const secret = 'segredosecreto';

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    // Através o método verify, é possível validar e decodificar o JWT
    const decoded = jwt.verify(token, secret);
    // Buscar na base se existe um usuário com aquele e-mail para confirmar o JWT
    const user = await findEmail(decoded.userData.email);
    // Caso o usuário não exista, é indicativo de que houve algo de errado no JWT
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    // Se o usuário existir, tornar ele disponível ao objeto res
    req.user = decoded.userData;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { verifyToken };
