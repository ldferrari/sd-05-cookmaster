const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);
  if (err.code === 'invalid_data') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 'conflict') {
    return res.status(409).json({ message: err.message });
  }
  if (err.code === 'invalid_user') {
    return res.status(401).json({ message: err.message });
  }
  if (err.code === 'unauthorized') {
    return res.status(401).json({ message: err.message });
  }
  if (err.code === 'not_found') {
    return res.status(404).json({ message: err.message });
  }
  if (err.code === 'wrong_auth') {
    return res.status(401).json({ message: err.message });
  }
  // if (err.code === 'invalid_id') {
  //   return res.status(401).json({ message: err.message });
  // }
  // this error was returned by invalid ObjectId in services
  // now directly treated within models
};

module.exports = errorMiddleware;
