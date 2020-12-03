const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const secret = 'secret-stuff-here-what?';
    const payload = jwt.verify(token, secret);
    req.userPayload = payload.userData;
    // console.log(payload);
    // console.log(req.payload);
    // if (!payload.exp * 1000 > Date.now()) {
    //   return res.status(401).json({ message: 'jwt malformed' });
    // }
    // useless bc if no valid token, l10 breaks, goes to catch
    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;
