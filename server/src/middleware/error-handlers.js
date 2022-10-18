exports.errorResponder = (error, req, res, next) => {
  const status = error.statusCode || 500;
  return res.status(status).json({
    status: 'Fail',
    statusCode: error.statusCode,
    message: error.message,
  });
};

exports.invalidPathHandler = (req, res) => {
  return res.status(404).json({
    status: 'Fail',
    statusCode: res.statusCode,
    message: `${res.statusCode} - ${req.originalUrl} not found. Invalid path`,
  });
};
