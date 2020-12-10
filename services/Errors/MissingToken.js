const { ServiceError } = require('./ServiceError');

class MissingToken extends ServiceError {
  constructor() {
    super('missing auth token');
    this.code = 'missing_token';
  }
}

module.exports = MissingToken;
