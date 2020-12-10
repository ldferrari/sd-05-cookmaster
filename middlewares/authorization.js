const Errors = require('../services/Errors');
const JWT = require('./JWT');

const authorization = (required = true) => async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!required) {
      return next();
    }
    if (required && !token) {
      throw new Errors.MissingToken();
    }
    const user = await JWT.tokenVerifyer(token);
    req.user = user;
    return next();
  } catch (err) {
    if (err instanceof Errors.AuthorizationFailed) {
      res.status(401).json({ message: err.message });
    }
    if (err instanceof Errors.MissingToken) {
      res.status(401).json({ message: err.message });
    }
    next(`${err.message}`);
  }
};

module.exports = authorization;
