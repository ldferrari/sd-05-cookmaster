// const jwt = require('jsonwebtoken');

// const validateToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const secret = 'secret-stuff-here-what?';
//     const payload = await jwt.verify(token, secret);
//     console.log(payload.exp);
//     if (!token || !payload.exp * 1000 > Date.now()) {
//       return res.status(401).json({ message: 'jwt malformed' });
//     }
//     return next();
//   } catch (_) {
//     return res.status(401).json({ message: 'jwt malformed' });
//   }
// };

// module.exports = validateToken;
