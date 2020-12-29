const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const loginUser = async (req, res, _next) => {
  try {
    const { email, password: passwd } = req.body;
    const user = await UserModel.findBy({ email });
    if (passwd !== user.password) {
      return res.status(401).json(Error.incorrectFields);
    }
    const { password, ...userWithoutPassword } = user;
    const payload = {
      iss: 'Cookmaster-api',
      aud: 'identity',
      userData: userWithoutPassword,
    };
    const token = jwt.sign(payload, process.env.SECRET, jwtConfig);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno' });
  }
};

// const isLogged = async (req, res, _next) => {
//   const { authorization } = req.headers;
// };

module.exports = { loginUser };
