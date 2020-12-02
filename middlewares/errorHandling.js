module.exports = (err, _req, res, _next) => {
  if (err.code === 'invalid_entries') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 'duplicate_email') {
    return res.status(409).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: err.message });
};
