const jwt = require('jsonwebtoken');
const model = require('../models/usersModel');

const secret = 'lostartofkeepasecret';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, secret);
    const user = await model.checkEmail(payload.userData.email);
    // console.log(user);
    // Caso o usuário não exista, cria-se um novo erro para impedir a continuação.
    if (!user) {
      // console.log('entrei aqui');
      throw new Error({ code: 'invalid_user', message: 'Invalid entries. Try again' });
    }
    // Retira o password do objeto a ser trabalhado conforme as boas práticas ensinadas na aula
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    return next();
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};
module.exports = validateJWT;
