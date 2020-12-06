const { ServiceError } = require('./ServiceError');

class InvalidEntries extends ServiceError {
  constructor() {
    super('Invalid entries. Try again.');
    this.code = 'invalid_entries';
  }
}

module.exports = InvalidEntries;
