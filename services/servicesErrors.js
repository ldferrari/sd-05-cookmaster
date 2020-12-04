class ServiceError extends Error {}

class idNotFoundError extends ServiceError {
  constructor(id) {
    super(`Batata with id ${id} was not found`);
    this.code = 'not_found';
  }
}

module.exports = {
  idNotFoundError,
};
