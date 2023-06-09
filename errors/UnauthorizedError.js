const { UNAUTHORIZED_ERROR_STATUS } = require('../utils/statusConstants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_STATUS;
  }
}

module.exports = UnauthorizedError;
