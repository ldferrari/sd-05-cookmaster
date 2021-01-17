const jwt = require('jsonwebtoken');
const { findEmail } = require('../models/users');

const secret = 'segredosecreto';

const generateToken = async (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  // Removendo a senha do usuário (recebido como parâmetro) para transportar informações sensíveis
  const { password: _, ...userWithoutPassword } = user;
  // [No seu payload deve estar presente o id, email e role do usuário.]
  const { _id: id } = userWithoutPassword;
  const payload = {
    sub: id,
    userData: userWithoutPassword,
  };
  // Assinatura
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    // Através o método verify, é possível validar e decodificar o JWT
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    // Buscar na base se existe um usuário com aquele e-mail para confirmar o JWT
    const user = await findEmail(decoded.userData.email);
    // Caso o usuário não exista, é indicativo de que houve algo de errado no JWT
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    // Se o usuário existir, tornar ele disponível ao objeto res
    req.userPayload = decoded.userData;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { generateToken, verifyToken };
