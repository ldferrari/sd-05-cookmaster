const { ServiceError } = require('./ServiceError');

class EmailAlreadyExists extends ServiceError {
  constructor() {
    super('Email already registered');
    this.code = 'email_already_exists';
  }
}

module.exports = EmailAlreadyExists;
