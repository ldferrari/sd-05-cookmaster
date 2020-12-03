class CodeError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

module.exports = CodeError;

//  https://www.alura.com.br/artigos/utilizando-export-modules-no-node-js
