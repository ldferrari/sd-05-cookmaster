const validate = (schema, status) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (!error) return next();
  res.status(status || 422).json({ message: error.details[0].message });
};

module.exports = validate;
