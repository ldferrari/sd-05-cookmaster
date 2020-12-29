module.exports = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json({ message: 'missing field(s)' });
  }

  next();
};
