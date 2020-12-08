module.exports = async (err, _req, res, _next) => {
  const { error, ...errorWithoutError } = err;

  if (err.message === 'Invalid entries. Try again.') {
    return res.status(400).json(errorWithoutError);
  }

  if (err.message === 'Email already registered') {
    return res.status(409).json(errorWithoutError);
  }

  if (err.message === 'All fields must be filled') {
    return res.status(401).json(errorWithoutError);
  }

  if (err.message === 'Incorrect username or password') {
    return res.status(401).json(errorWithoutError);
  }

  if (err.message === 'jwt malformed') {
    res.status(401).json(errorWithoutError);
  }

  if (err.message === 'recipe not found') {
    res.status(404).json(errorWithoutError);
  }

  if (err.message === 'missing auth token') {
    res.status(401).json(errorWithoutError);
  }
};
