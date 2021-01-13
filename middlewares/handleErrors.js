module.exports = (err, _req, res, _next) => {
  if (err.code === 'invalid_entries') {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 'email_already_exists') {
    return res.status(409).json({ message: err.message });
  }

  console.log(err);
  res.status(500).json({ err });
};
