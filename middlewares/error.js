module.exports = async (err, _req, res, _next) => {
  if (err.message === 'Invalid entries. Try again.') {
    return res.status(400).json(err);
  }

  if (err.message === 'Email already registered') {
    return res.status(409).json(err);
  }
};
