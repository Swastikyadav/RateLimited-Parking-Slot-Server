const ErrorHandler = require("../errors/ErrorHandler");

function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof ErrorHandler) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status
      }
    });
  } else {
    res.status(500).json({
      error: {
        message: err.message,
        status: err.status
      }
    });
  }
}

module.exports = errorHandlerMiddleware;