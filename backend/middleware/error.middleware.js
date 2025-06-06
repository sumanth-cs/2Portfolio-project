export default (error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};