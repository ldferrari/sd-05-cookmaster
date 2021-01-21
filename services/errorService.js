// Não conhecia e usei o do Paulo Zambelli;
function errorGenerator(code, message) {
  const err = new Error();
  Object.assign(err, { code, message });
  return err;
}
module.exports = errorGenerator;
