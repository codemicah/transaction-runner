exports.ErrorResponse = (res, message, code = 500, error = {}) => {
  return res.status(code).json({
    success: false,
    message,
    error: {
      code,
      description: error,
    },
  });
};

exports.SuccessResponse = (res, message, code = 200, data = {}) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};
