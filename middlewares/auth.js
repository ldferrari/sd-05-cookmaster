const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const secret = '12345678';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const payload = jwt.verify(token, secret);
    const user = await usersModel.getEmail(payload.userData);

    if (!user) {
      return {
        error: true,
        statusCode: 400,
        code: 'invalid_data',
        message: 'invalid token',
      };
    }
    req.user = payload.userData;

    return next();
  } catch (error) {
    // console.log(error.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
