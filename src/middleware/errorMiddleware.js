const { errorResponse } = require('../utils/response');

const notFound = (req, res, next) => {
  errorResponse(res, `Not Found - ${req.originalUrl}`, 404);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error('Error:', err.message);
  
  errorResponse(res, err.message || 'Internal Server Error', statusCode);
};

module.exports = { notFound, errorHandler };
