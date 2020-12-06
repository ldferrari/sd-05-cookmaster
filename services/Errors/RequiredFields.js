const { ServiceError } = require('./ServiceError');

class RequiredFields extends ServiceError {
  constructor() {
    super('All fields must be filled');
    this.code = 'required_fields';
  }
}

module.exports = RequiredFields;
