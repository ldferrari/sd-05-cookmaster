module.exports = (err, _req, res, _next) => {
  console.error(err);
  const { message, code } = err;
  if (code === 'invalid_data') {
    res.status(400).json({ message });
  }
  if (code === 'conflict') {
    res.status(409).json({ message });
  }
  if (code === 'unauthorized_data') {
    res.status(401).json({ message });
  }
  if (code === 'invalid_user') {
    res.status(401).json({ message });
  }
  if (code === 'not_found') {
    res.status(404).json({ message });
  }
};
