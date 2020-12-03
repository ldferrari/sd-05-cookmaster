module.exports = async (err, _req, res, _next) => {
  if (err.message === 'Invalid entries. Try again.') {
    return res.status(400).json(err);
  }
};
