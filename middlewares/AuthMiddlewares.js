const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findBy({ name: payload.userData.name });
    const { password: _password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not allowed' });
  }
};

module.exports = { validateJWT };
