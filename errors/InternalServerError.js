const { INTERNAL_SERVER_ERROR_STATUS } = require('../utils/statusConstants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR_STATUS;
  }
}

module.exports = InternalServerError;
