const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger'); // assuming you have a logger utility

const errorHandlerMiddleware = (err, req, res, next) => {
  // Log the error details for debugging
  logger.error('Error:', err);

  // If the error is an instance of CustomAPIError, return a custom error message and status code
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // Handle specific error types, e.g., validation errors
  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized access' });
  }

  // Default to 500 Internal Server Error for unhandled errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: 'Something went wrong, please try again later',
    // Include the error message in the response in non-production environments
    ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
  });
};

module.exports = errorHandlerMiddleware;
