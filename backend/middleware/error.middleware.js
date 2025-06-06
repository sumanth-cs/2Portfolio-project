/**
 * middleware Global Error handling.
 */
export const errorMiddleware = (error, req, res, next) => {
  console.error('Error:', error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message || 'Internal Server Error',
  });
};