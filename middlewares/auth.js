const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const secret = 'senhaUltraSigilosa!';

    const payload = jwt.verify(token, secret, { audience: 'identity', issuer: 'post-api' });
    // console.log(payload);
    if (!payload || typeof payload === 'string') {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    // const user = await userModel.getUserByEmail(payload.userData.email);
    // if (!user) {
    //   return res.status(401).json({ message: 'jwt malformed' });
    // }
    // console.log(user._id);
    req.userData = payload.userData;

    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
