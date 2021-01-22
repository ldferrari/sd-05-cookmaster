const jwt = require('jsonwebtoken');

const funToken = (userFound) => {
  const secret = 'segredo';
  const jwtConfig = {
    expiresIn: '1d', // tempo para o token inspirar
    algorithm: 'HS256', // algorítimo assimétrico (algotítimo padrão, não necessário colocar)
  };

  const { password: _, ...userWithoutPassword } = userFound;
  const { _id: userId } = userFound;
  const payload = {
    iss: 'post-api', // issuer -> quem emitiu o token
    aud: 'post-api', // Audience -> quem deve aceitar o token
    sub: userId, // Suject -> A quem pertence esse token
    useData: userWithoutPassword,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = funToken;
