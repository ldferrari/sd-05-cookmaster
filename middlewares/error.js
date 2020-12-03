module.exports = async (err, _req, res, _next) => {
  const { error, ...errorWithoutError } = err;

  if (err.message === 'Invalid entries. Try again.') {
    return res.status(400).json(errorWithoutError);
  }

  if (err.message === 'Email already registered') {
    return res.status(409).json(errorWithoutError);
  }
};
