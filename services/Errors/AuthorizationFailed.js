const { ServiceError } = require('./ServiceError');

class AuthorizationFailed extends ServiceError {
  constructor() {
    super('jwt malformed');
    this.code = 'unauthorized';
  }
}

module.exports = AuthorizationFailed;
