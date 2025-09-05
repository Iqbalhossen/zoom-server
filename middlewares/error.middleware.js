// Not Found (404) Handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// General Error Handler
const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
