const { ServiceError } = require('./ServiceError');

class RecipeNotFound extends ServiceError {
  constructor() {
    super('recipe not found');
    this.code = 'not_found';
  }
}

module.exports = RecipeNotFound;
