const { ServiceError } = require('./ServiceError');

class IncorrectEntries extends ServiceError {
  constructor() {
    super('Incorrect username or password');
    this.code = 'incorrect_entries';
  }
}

module.exports = IncorrectEntries;
