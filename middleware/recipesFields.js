module.exports = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(401).json({ message: 'missing field(s)' });
  }

  next();
};
