const { ServiceError } = require('./ServiceError');

class IdNotFound extends ServiceError {
  constructor(id) {
    super(`id ${id} was not found`);
    this.code = 'not_found';
  }
}

module.exports = IdNotFound;
