// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
// https://stackoverflow.com/questions/1382107
class ThrowMyError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

module.exports = ThrowMyError;
