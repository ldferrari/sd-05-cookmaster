function errorGenerator(code, message) {
  const err = new Error();
  Object.assign(err, { code, message });
  return err;
}
module.exports = errorGenerator;
