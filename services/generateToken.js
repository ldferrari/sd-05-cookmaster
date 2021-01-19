const jwt = require('jsonwebtoken');

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

module.exports = { generateToken };
